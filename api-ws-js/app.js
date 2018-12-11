'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//Cargar de rutas
var user_routes = require('./routers/use');

//middlewares de  body parse
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

//configuracion de cabeceras y cors

//rutas base
app.use('/api', user_routes);

app.get('/probando', (req, resp) => {
    resp.status(200).send({message: 'Este el método probando'});
});

module.exports = app;

