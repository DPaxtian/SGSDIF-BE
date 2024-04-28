const Usuario = require('../modelos/usuario-modelo')
const CodigosEstado = require('../utileria/codigos-estado')
const Logger = require('../configuracion/logger')


async function registrarUsuario (usuario) {
    return new Promise((resolve, reject) => {
        let datosUsuario = new Usuario(usuario)

        let usuarioRegistrado = datosUsuario.save()
        .then((usuarioRegistrado) => {
            resolve(usuarioRegistrado._id)
        })
        .catch((error) => {
            Logger.error(`Ha ocurrido un error registrando al usuario: ${error}`)
            reject(CodigosEstado.INTERNAL_SERVER_ERROR)
        })
    })
}


module.exports = {
    registrarUsuario
}