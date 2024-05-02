const UsuarioServicio = require('../servicios/usuarios-servicio')
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')
const bcrypt = require('bcrypt')
const Validaciones = require('../utileria/validaciones-joi')
const jwt = require('jsonwebtoken')
const { HttpError, BadRequestError } = require('../utileria/excepciones')


async function registrarUsuario(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Usuario no registrado :(";
    let id_registro = null

    try {
        let datosUsuario = req.body;

        const { error } = Validaciones.usuarioValidacion.validate(datosUsuario)

        if (error) {
            codigoResultado = CodigosEstado.BAD_REQUEST;
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash_contrasena = await bcrypt.hash(datosUsuario.contrasena, salt);

            datosUsuario.contrasena = hash_contrasena

            id_registro = await UsuarioServicio.registrarUsuario(datosUsuario)
        }

        if (id_registro !== null) {
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


async function iniciarSesion(req, res) {
    let token = null;

    try {
        let datosLogin = req.body;

        const { error } = Validaciones.inicioSesionValidacion.validate(datosLogin);

        if (error) {
            throw new BadRequestError('Información incompleta o errónea, por favor verifíquela');
        }

        const usuario = await UsuarioServicio.validarCredenciales(datosLogin);

        token = jwt.sign(
            {
                id_usuario: usuario._id,
                nombre_usuario: usuario.nombre_usuario,
                apellido_paterno: usuario.apellido_paterno,
                nombre_usuario: usuario.nombre_usuario,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        return res.header('token_acceso', token).json({
            code: CodigosEstado.OK,
            msg: "Inicio de sesion exitoso :)",
            data: token
        })


    } catch (error) {
        exceptionMessage = ""
        exceptionCode = ""

        if (error instanceof HttpError) {
            exceptionCode = error.codigoEstado
            exceptionMessage = error.message
        } else {
            exceptionCode = CodigosEstado.INTERNAL_SERVER_ERROR
            exceptionMessage = "Ha ocurrido un error en iniciarSesion controlador"
        }

        Logger.error(`Error en iniciar sesion: ${error}`)
        return res.status(exceptionCode).json({
            code: exceptionCode,
            msg: exceptionMessage
        });
    }
}


module.exports = {
    registrarUsuario,
    iniciarSesion
}