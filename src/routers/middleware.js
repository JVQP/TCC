const middleware = function(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        res.redirect('/login');
    }
}



module.exports = middleware;