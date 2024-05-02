const jwt = require('jsonwebtoken')
const CodigosEstado = require('../utileria/codigos-estado')


function validarToken(req, res, next) {
    const token = req.header('token_acceso')

    if (!token) {
        return res.status(CodigosEstado.UNAUTHORIZED).json({
            code: CodigosEstado.UNAUTHORIZED,
            msg: "Acceso denegado"
        })
    }
    try {
        const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = usuarioVerificado
        next()
    } catch (error) {
        res.status(CodigosEstado.UNAUTHORIZED).json({
            code: CodigosEstado.UNAUTHORIZED,
            msg: "Acceso denegado"
        })
    }
}

module.exports = validarToken;