const solicitudesServicio = require("../servicios/solicitudes-servicios")
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')
const Validaciones = require('../utileria/validaciones-joi')
const DriveServicio = require('../servicios/google-drive-servicios')
const { HttpError, BadRequestError, NotFoundError } = require("../utileria/excepciones")



const registrarSolicitud = async (req, res) => {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Solicitud no creada :(";
    let id_solicitud_creada = null

    try {
        let nuevaSolicitud = req.body;

        const { error } = Validaciones.solicitudValidacion.validate(nuevaSolicitud)

        if (error) {
            codigoResultado = CodigosEstado.BAD_REQUEST;
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            id_solicitud_creada = await solicitudesServicio.nuevaSolicitud(nuevaSolicitud);
        }

        if (id_solicitud_creada !== null) {
            codigoResultado = CodigosEstado.CREATED;
            mensajeRespuesta = "Solicitud creada con éxito :)";
        }
    } catch (error) {
        Logger.error(`Ocurrio un error en el controlador crearSolicitud: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta,
        data: id_solicitud_creada
    });
}


async function obtenerSolicitudes(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR
    let mensajeRespuesta = "Ha ocurrido un error :("
    let datosRespuesta = []

    try {
        datosRespuesta = await solicitudesServicio.obtenerSolicitudes()

        if (datosRespuesta.length === 0) {
            codigoResultado = CodigosEstado.NOT_FOUND
            mensajeRespuesta = "No se han encontrado solicitudes"
        } else {
            codigoResultado = CodigosEstado.OK
            mensajeRespuesta = "Solicitudes encontradas correctamente"
        }
    } catch (error) {
        Logger.error(`Ha ocurrido un error en obtenerSolicitudescontrolador: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta,
        data: datosRespuesta
    })
}


async function obtenerSolicitudesPorCurp(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR
    let mensajeRespuesta = "Ha ocurrido un error :("
    let datosRespuesta = []

    try {
        const curp = req.params.curp

        const { error } = Validaciones.curpValidacion.validate(curp)

        if (error) {
            throw new BadRequestError("Información incompleta o errónea, por favor verifíquela")
        }

        datosRespuesta = await solicitudesServicio.obtenerSolicitudesPorCurp(curp)

        if (datosRespuesta.length === 0) {
            throw new NotFoundError("No se han encontrado solicitudes con este curp")
        } else {
            codigoResultado = CodigosEstado.OK
            mensajeRespuesta = "Solicitudes encontradas correctamente"
        }
    } catch (error) {
        exceptionMessage = ""
        exceptionCode = ""

        if (error instanceof HttpError) {
            exceptionCode = error.codigoEstado
            exceptionMessage = error.message
        } else {
            exceptionCode = CodigosEstado.INTERNAL_SERVER_ERROR
            exceptionMessage = "Ha ocurrido un error en buscarSolicitudesPorCurp controlador"
        }

        Logger.error(`Error en obtener solicitudes por curp: ${error}`)
        return res.status(exceptionCode).json({
            code: exceptionCode,
            msg: exceptionMessage
        });
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta,
        data: datosRespuesta
    })
}

async function actualizarSolicitud(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Solicitud no actualizada :(";

    try {
        let idSolicitud = req.params.id_solicitud;
        let solicitudActualizada = req.body;

        const { error } = Validaciones.solicitudValidacion.validate(nuevaSolicitud)

        if (error) {
            codigoResultado = CodigosEstado.BAD_REQUEST;
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            codigoResultado = await solicitudesServicio.actualizarSolicitud(idSolicitud, solicitudActualizada);
        }

        if (codigoResultado === CodigosEstado.OK) {
            mensajeRespuesta = "Solicitud actualizada con éxito :)";
        }
    } catch (error) {
        Logger.error(`Ocurrio un error en el controlador actualizarSolicitud: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta
    });
}


async function subirArchivo(req, res) {
    try {
        await DriveServicio.crearCarpeta("carpeta_prueba")
    } catch (error) {

    }
}


module.exports = {
    registrarSolicitud,
    obtenerSolicitudes,
    actualizarSolicitud,
    subirArchivo,
    obtenerSolicitudesPorCurp
}