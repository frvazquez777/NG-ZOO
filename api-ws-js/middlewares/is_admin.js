'use strict'

exports.isAdmin = function (req, resp, next) {

    if (req.user.role != 'ROLE_ADMIN') {
        return resp.status(200).send({
            message: 'No tiene Acceso a esta zona'
        });
    }

    next();
}
