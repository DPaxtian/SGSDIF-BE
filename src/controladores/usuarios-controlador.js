const UsuarioServicio = require('../servicios/usuarios-servicio')
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')
const bcrypt = require('bcrypt')
const Validaciones = require('../utileria/validaciones-joi')


async function registrarUsuario(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Usuario no registrado :(";
    let id_registro = null

    try {
        let datosUsuario = req.body;

        const { error } = Validaciones.usuarioValidacion.validate(datosUsuario)

        if(error){
            codigoResultado = CodigosEstado.BAD_REQUEST;
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash_contrasena = await bcrypt.hash(datosUsuario.contrasena, salt);

            datosUsuario.contrasena = hash_contrasena

            id_registro = await UsuarioServicio.registrarUsuario(datosUsuario)
        }

        if(id_registro !== null){
            codigoResultado = CodigosEstado.OK
            mensajeRespuesta = "Usuario registrado con exito :)"
        }

        
    } catch (error) {
        Logger.error(`Ocurrio un error en el controlador crearSolicitud: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta,
        data: id_registro
    })
}


module.exports = {
    registrarUsuario
}