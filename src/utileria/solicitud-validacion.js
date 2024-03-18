const CodigosEstado = require('../utileria/codigos-estado');

function validarSolicitudNoVacia(datosSolicitud) {
    let resultadoValidacion = CodigosEstado.OK;

    if (datosSolicitud.no === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.fecha_captura === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.nombre === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.apellido_paterno === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.apellido_materno === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.curp === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.colonia === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.cp === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.telefono === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.apoyo_solicitado === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.observaciones === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    return resultadoValidacion;
}


function validarDatosSolicitud(datosSolicitud) {
    let resultadoValidacion = CodigosEstado.OK;

    if (!Number.isInteger(datosSolicitud.no))
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.fecha_captura !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.nombre !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.apellido_paterno !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.apellido_materno !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (!validarCURP(datosSolicitud.curp))
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.colonia !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (!validarCodigoPostal(datosSolicitud.cp))
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (!validarTelefono(datosSolicitud.telefono))
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.apoyo_solicitado !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.observaciones !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    return resultadoValidacion;
}


function validarCURP(curp) {
    if (curp.length !== 18) {
        return false;
    }

    for (let i = 0; i < 4; i++) {
        if (!/[A-Z]/.test(curp.charAt(i))) {
            return false;
        }
    }

    for (let i = 4; i < 10; i++) {
        if (!/\d/.test(curp.charAt(i))) {
            return false;
        }
    }

    for (let i = 10; i < 12; i++) {
        if (!/[A-Z]/.test(curp.charAt(i))) {
            return false;
        }
    }

    if (!/[\dA-Z]/.test(curp.charAt(17))) {
        return false;
    }

    return true;
}


function validarCodigoPostal(cp) {
    const regexCP = /^\d{5}$/;
    return regexCP.test(cp);
}


function validarTelefono(telefono) {
    const regexTelefono = /^\d{10}$/;
    return regexTelefono.test(telefono);
}



module.exports = {
    validarSolicitudNoVacia,
    validarDatosSolicitud
}