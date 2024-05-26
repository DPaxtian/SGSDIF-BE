const Usuario = require('../modelos/usuario-modelo')
const CodigosEstado = require('../utileria/codigos-estado')
const Logger = require('../configuracion/logger')
const bcrypt = require('bcrypt');
const { NotFoundError, InternalServerError } = require('../utileria/excepciones')


async function registrarUsuario (usuario) {
    try {
        const datos_usuario = new Usuario(usuario)

        const resultado_consulta = await datos_usuario.save()

        if (resultado_consulta !== null){
            return resultado_consulta
        }
    } catch ( error ) {
        Logger.error(`Ha ocurrido un error creando un usuario: ${error}`)
        throw new InternalServerError("No se ha podido registrar el usuario")
    }
}


async function obtenerUsuarios() {
    try {
        const usuarios_encontrados = await Usuario.find({});

        if (!usuarios_encontrados || usuarios_encontrados.length === 0) {
            throw new NotFoundError("No se han encontrado usuarios");
        }

        return usuarios_encontrados;
    } catch (error) {
        if (error instanceof NotFoundError) {
            Logger.warn("No se han encontrado usuarios");
            throw error;
        } else {
            Logger.error("Ha ocurrido un error obteniendo a los usuarios", { error });
            throw new InternalServerError("No se han podido encontrar a los usuarios");
        }
    }
}


async function actualizarUsuario(id_usuario, usuario_actualizado) {
    try {
        const usuario_encontrado = await Usuario.findByIdAndUpdate(id_usuario, usuario_actualizado, { new: true });

        if (usuario_encontrado === null) {
            throw new NotFoundError(`No se ha encontrado el usuario con el id: ${id_usuario}`);
        } else {
            return CodigosEstado.OK;
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            Logger.warn(`No se encontró el usuario con el id: ${id_usuario}`);
            throw error;
        } else {
            Logger.error("Ha ocurrido un error actualizando el usuario", { error, id_usuario, usuario_actualizado });
            throw new InternalServerError("No se pudo actualizar el usuario");
        }
    }
}

async function eliminarUsuario(id_usuario) {
    try {
        const resultado_eliminacion = await Usuario.findByIdAndDelete(id_usuario);

        if (resultado_eliminacion !== null) {
            return CodigosEstado.OK;
        } else {
            throw new NotFoundError(`No se ha encontrado un usuario con el id: ${id_usuario}`);
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            Logger.warn(`No se encontró el usuario con el id: ${id_usuario}`);
            throw error;
        } else {
            Logger.error("Ha ocurrido un error eliminando el usuario", { error, id_usuario });
            throw new InternalServerError("No se ha podido eliminar el usuario");
        }
    }
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
    validarCredenciales,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
}