'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'angular_2018';

exports.ensureAuth = function (req, resp, next) {

    if (!req.headers.authorization) {
        return resp.status(403).send({
            message: 'La peticion no tiene cabecera de autentificacion.'
        });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);
        if(payload.sub && (payload.exp <= moment().unix())) {
            return resp.status(401).send({
                message: 'El token ha expirado'
            });
        }
    } catch (ex) {
        console.log(ex);
        return resp.status(404).send({
            message: 'El token NO valido'
        });
    }

    req.user = payload;
    next();
};