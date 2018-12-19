'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();

//middlewares -> Autentificaciòn
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

//modulos
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/animals' });

//rutas servicios
api.post('/animal', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.put('/animal/:id', md_auth.ensureAuth, AnimalController.updateAnimal);
api.post('/upload-animal/:id', [md_auth.ensureAuth, md_upload], AnimalController.uploadImage);
api.get('/get-image-animal/:id', AnimalController.getImageFile);
api.delete('/animal/:id', md_auth.ensureAuth, AnimalController.deleteAnimal);

module.exports = api;
