'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');

//servicio jwt
var jwt = require('../services/jwt');



//acciones
function pruebas(req, resp) {
    resp.status(200).send({
        message: 'Probando el controlador usuario',
        user: req.user
    });
}

function saveUser(req, resp) {
    //instanciar objecto usuario
    var user = new User();

    //recoger los paremetros
    var params = req.body;

    console.log(params);

    //asignar valores al objecto usuario
    if (params.password && params.name && params.lastname && params.email) {
        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({
            email: user.email.toLowerCase()
        }, (err, issetUser) => {
            if (err) {
                resp.status(500).send({
                    message: 'Error al comprobar el usuario'
                });
            } else {
                if (!issetUser) {
                    //cifrar contraseña
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        //guardar usuario
                        user.save((err, userStored) => {
                            if (err) {
                                resp.status(500).send({
                                    message: 'Error al guardar el usuario'
                                });
                            } else {
                                if (!userStored) {
                                    resp.status(404).send({
                                        message: 'No se ha registrado el usuario'
                                    });
                                } else {
                                    resp.status(200).send({
                                        user: userStored
                                    });
                                }
                            }
                        });
                    });
                } else {
                    resp.status(200).send({
                        message: 'El Usuario ya esta registrado'
                    });
                }
            }
        });

    } else {
        resp.status(200).send({
            message: 'Introduce correctamente los datos para registrar al usuario'
        });
    }
}

function login(req, resp) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase()
    }, (err, issetUser) => {
        if (err) {
            resp.status(500).send({
                message: 'Error al comprobar el usuario'
            });
        } else {
            if (issetUser) {

                bcrypt.compare(password, issetUser.password, (err, check) => {
                    if (check) {
                        //comprobar y generar token
                        if (params.gettoken) {
                            //devolver token
                            resp.status(200).send({
                                token: jwt.createToken(issetUser)
                            });
                        } else {
                            resp.status(200).send({
                                issetUser
                            });
                        }

                    } else {
                        resp.status(404).send({
                            message: 'El Usuario y/o Contraseña Incorrecta.'
                        });
                    }
                })

            } else {
                resp.status(404).send({
                    message: 'El Usuario No Existe'
                });
            }
        }
    });
}

function updateUser(req, resp) {

    var userId = req.params.id;
    var update = req.body;

    console.log(req.params);
    if (userId != req.user.sub) {
        return resp.status(200).send({
            message: 'No tienes permiso para actualizar el registro.'
        });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) {
            resp.status(500).send({
                message: 'Error al Actualizar Usuario'
            });
        } else {
            if (!userUpdated) {
                resp.status(404).send({
                    message: 'No se ha podido realizar la actualizaciòn del registro'
                });
            } else {
                resp.status(200).send({
                    message: 'Registro Actualizado.',
                    user: userUpdated
                });
            }
        }
    });
}

function uploadImage(req, resp) {
    //console.log(req);
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.imagen.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            if (userId != req.user.sub) {
                return resp.status(200).send({
                    message: 'No tienes permiso para actualizar el registro.'
                });
            }
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
                if (err) {
                    resp.status(500).send({
                        message: 'Error al Actualizar Usuario'
                    });
                } else {
                    if (!userUpdated) {
                        resp.status(404).send({
                            message: 'No se ha podido realizar la actualizaciòn del registro'
                        });
                    } else {
                        resp.status(200).send({
                            message: 'Registro Actualizado.',
                            user: userUpdated,
                            image: file_name
                        });
                    }
                }
            });

        } else {
            //extension no validas
            fs.unlink(file_path, (err) => {
                if (err) {
                    resp.status(200).send({
                        message: 'Extencion No valida y fichero no eliminado.'
                    });
                } else {
                    resp.status(200).send({
                        message: 'Extencion No valida'
                    });
                }
            });
        }

    } else {
        resp.status(200).send({
            message: 'No hay ficheros'
        });
    }
}

function getImageFile(req, resp) {

    var imageFile = req.params.imageFile;
    var path_file = './upload/users/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            resp.sendFile(path.resolve(path_file));
        } else {
            resp.status(404).send({
                message: 'Imagen No Existe'
            });
        }
    });
}

function getKeepers(req, resp) {
    User.find({ role: 'ROLE_ADMIN' }).exec((err, users) => {
        if (err) {
            resp.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!users) {
                resp.status(404).send({
                    message: 'No hay cuidadores.'
                });
            } else {
                resp.status(200).send({
                    users
                });
            }
        }
    });

}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers
}
