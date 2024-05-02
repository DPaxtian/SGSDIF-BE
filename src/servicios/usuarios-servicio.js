const Usuario = require('../modelos/usuario-modelo')
const CodigosEstado = require('../utileria/codigos-estado')
const Logger = require('../configuracion/logger')
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../utileria/excepciones')


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


async function validarCredenciales(usuario) {
    try {
        const usuarioEncontrado = await Usuario.findOne({ nombre_usuario: usuario.nombre_usuario });

        if (!usuarioEncontrado) {
            throw new NotFoundError('Usuario o contraseña incorrectos');
        }

        const contrasenaValida = await bcrypt.compare(usuario.contrasena, usuarioEncontrado.contrasena);

        if (contrasenaValida) {
            return usuarioEncontrado;
        } else {
            throw new NotFoundError('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        Logger.error(`Ha ocurrido un error validando credenciales: ${error}`);
        throw new NotFoundError('Usuario o contraseña incorrectos');
    }
}



module.exports = {
    registrarUsuario,
    validarCredenciales
}