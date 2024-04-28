const solicitudesServicio = require("../servicios/solicitudes-servicios")
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')
const Validaciones = require('../utileria/validaciones-joi')



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


module.exports = {
        registrarSolicitud,
        obtenerSolicitudes,
        actualizarSolicitud
    }