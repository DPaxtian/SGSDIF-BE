const solicitudesServicio = require("../servicios/solicitudes-servicios")
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')
const solicitudValidacion = require('../utileria/solicitud-validacion')



const registrarSolicitud = async (req, res) => {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Solicitud no creada :(";

    try {
        let nuevaSolicitud = req.body;

        let resultadoDatosVacios = solicitudValidacion.validarSolicitudNoVacia(nuevaSolicitud);
        let resultadoValidacion = solicitudValidacion.validarDatosSolicitud(nuevaSolicitud);

        if (resultadoValidacion === CodigosEstado.BAD_REQUEST || resultadoDatosVacios === CodigosEstado.BAD_REQUEST) {
            codigoResultado = CodigosEstado.BAD_REQUEST;
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            codigoResultado = await solicitudesServicio.nuevaSolicitud(nuevaSolicitud);
        }

        if (codigoResultado === CodigosEstado.CREATED) {
            mensajeRespuesta = "Solicitud creada con éxito :)";
        }
    } catch (error) {
        Logger.error(`Ocurrio un error en el controlador crearSolicitud: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta
    });
}


module.exports = {
    registrarSolicitud
}