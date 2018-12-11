'use strict'

var mongoose = require('moongoose');

var app = require('./app');
var port = process.env.port || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo')
    .then(() => {
        console.log('La conexion de base de datos se ha realizado...');

        app.listen(port, () => {
            console.log('El servidor local con Node y Express esta corriendo...');
        });
    })
    .catch(err => {
        console.error('Error de Conexión');
        console.error(err);
    });
