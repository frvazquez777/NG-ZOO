'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//Cargar de rutas
var user_routes = require('./routers/use');
var animal_routes = require('./routers/animal');

//middlewares de  body parse
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

//configuracion de cabeceras y cors
app.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    resp.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');  
    resp.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');    
    next();
});

//rutas base
app.use('/api', user_routes);

app.use('/api', animal_routes);

module.exports = app;
 