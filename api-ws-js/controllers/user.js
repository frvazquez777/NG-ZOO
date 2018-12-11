'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

//servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, resp) {
    resp.status(200).send({
        message: 'Probando el controlador usuario'
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
                    if(check) {
                        //comprobar y generar token
                        if(params.gettoken) {
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

module.exports = {
    pruebas,
    saveUser,
    login
}
