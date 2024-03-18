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



module.exports = {
    nuevaSolicitud,
}