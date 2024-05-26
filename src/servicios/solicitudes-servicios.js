const Solicitud = require("../modelos/solicitudes-modelo");
const Logger = require('../configuracion/logger');
const CodigosEstado = require('../utileria/codigos-estado');
const { InternalServerError, NotFoundError } = require("../utileria/excepciones");

async function nuevaSolicitud(solicitud) {
    return new Promise((resolve, reject) => {
        let datosSolicitud = new Solicitud(solicitud);

        let info_solicitud = datosSolicitud.save()
        .then((info_solicitud) => {
            resolve(info_solicitud._id);
        })
        .catch((error) => {
            reject(CodigosEstado.INTERNAL_SERVER_ERROR);
            Logger.error(`Error creando la solicitud: ${error}`)
        })
    })
}


async function obtenerSolicitudes() {
    return new Promise((resolve, reject) =>{
        let solicitudesResultado = Solicitud.find({})
        .then((solicitudesResultado) => {
            resolve(solicitudesResultado)
        })
        .catch((error) => {
            Logger.error(`Ha ocurrido un error: ${error}`)
            reject(CodigosEstado.INTERNAL_SERVER_ERROR)
        })
    })
}


async function obtenerSolicitudesPorCurp(curp) {
    try{
        const solicitudes_resultado = Solicitud.find({"curp": curp})

        return solicitudes_resultado
    } catch (error) {
        Logger.error(`Ha ocurrido un error buscando las solicitudes: ${error}`)
        throw new InternalServerError("Ha ocurrido un error buscando las solicitudes")
    }
}


async function actualizarSolicitud(id_solicitud, solicitud) {
    return new Promise((resolve, reject) => {

        Solicitud.updateOne({_id: id_solicitud}, solicitud)
        .then(() => {
            resolve(CodigosEstado.OK);
        })
        .catch((error) => {
            reject(CodigosEstado.INTERNAL_SERVER_ERROR);
            Logger.error(`Error creando la solicitud: ${error}`)
        })
    })
}


async function cambiarEstadoSolicitud(id_solicitud, estado){
    const nuevo_estado = ""
    try{
        if (estado === 1){
            nuevo_estado = "ACEPTADA"
        }
        else if(estadoo === 2){
            nuevo_estado = "RECHAZADA"
        }

        const resultado_solicitud = Solicitud.find({_id: id_solicitud})

        if (resultado_solicitud === null){
            throw new NotFoundError(`No se ha encontrado una solicitud con el id: ${id_solicitud}`)
        }

    } catch (error){
        Logger.error(`Error cambiando el estdo de la solicitud: ${error}`)
    }
}


module.exports = {
    nuevaSolicitud,
    obtenerSolicitudes,
    actualizarSolicitud, 
    obtenerSolicitudesPorCurp,
    cambiarEstadoSolicitud
}