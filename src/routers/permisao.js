function verificarUsuario(tipo) {
    return function (req, res, next) {

        if (req.session.usuario && req.session.usuario.tipo === tipo) {

            next();

        } else {

            return res.redirect('/login');
        }


    }
}

module.exports = verificarUsuario;