const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    const token = req.header('Authorization')
    
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    message: "Token Inválido"
                })
            } else {
                req.user = {
                    email: decodedToken.email,
                    rol: decodedToken.rol
                }
                res.locals.user = req.user
                next()
            }
        })
    } else {
        res.status(401).json({
            message: "Acceso Denegado."
        })
    }
}

module.exports = authenticate