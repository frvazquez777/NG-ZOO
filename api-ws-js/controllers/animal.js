'use strict'

//modulos
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');
var Animal = require('../models/animal');

//acciones
function saveAnimal(req, resp) {

    var animal = new Animal();

    var params = req.body;

    if (params.name) {
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStored) => {
            if (err) {
                resp.status(500).send({
                    message: 'Error en el servidor',
                    user: req.user
                });
            } else {
                if (!animalStored) {
                    resp.status(200).send({
                        message: 'No se ha guardo el registro del animal.'
                    });
                } else {
                    resp.status(200).send({
                        animal: animalStored
                    });
                }
            }
        });
    } else {
        resp.status(200).send({
            message: 'Es necesario el nombre del animal.'
        });
    }
}

function getAnimals(req, resp) {
    Animal.find({}).populate({ path: 'user' }).exec((err, animals) => {
        if (err) {
            resp.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (!animals) {
                resp.status(404).send({
                    message: 'No hay Animales.'
                });
            } else {
                resp.status(200).send({
                    animals
                });
            }
        }
    });
}

function getAnimal(req, resp) {
    var animalId = req.params.id;

    Animal.findById(animalId).populate({ path: 'user' }).exec((err, animal) => {
        if (err) {
            resp.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (!animal) {
                resp.status(404).send({
                    message: 'El animal no existe.'
                });
            } else {
                resp.status(200).send({
                    animal
                });
            }
        }
    });
}

function updateAnimal(req, resp) {
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animalUpdate) => {
        if (err) {
            resp.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (!animalUpdate) {
                resp.status(404).send({
                    message: 'No se actualizado el registro.'
                });
            } else {
                resp.status(200).send({
                    animal: animalUpdate
                });
            }
        }
    });

}

function uploadImage(req, resp) {
    var animalId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdated) => {
                if (err) {
                    resp.status(500).send({
                        message: 'Error en el servidor'
                    });
                } else {
                    if (!animalUpdated) {
                        resp.status(404).send({
                            message: 'No se ha podido realizar la actualizaciòn del registro'
                        });
                    } else {
                        resp.status(200).send({
                            message: 'Registro Actualizado.',
                            user: animalUpdated,
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
    var path_file = './upload/animals/' + imageFile;
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

function deleteAnimal(req, resp) {
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
        if(err){
            resp.status(500).send({
                message: 'Error en el servidor'
            });
        }else {
            if(!animalRemoved) {
                resp.status(404).send({
                    message: 'No se ha podido eliminar el registro'
                });
            }else {
                resp.status(200).send({
                    animal: animalRemoved
                });
            }
        }
    });
}

module.exports = {
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    uploadImage,
    getImageFile,
    deleteAnimal
}