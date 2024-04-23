const Solicitud = require("../modelos/solicitudes-modelo");
const Logger = require('../configuracion/logger');
const CodigosEstado = require('../utileria/codigos-estado')

async function nuevaSolicitud(solicitud) {
    return new Promise((resolve, reject) => {
        let datosSolicitud = new Solicitud(solicitud);

        datosSolicitud.save()
        .then((resultado) => {
            resolve(CodigosEstado.CREATED);
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


module.exports = {
    nuevaSolicitud,
    obtenerSolicitudes
}