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

    if (datosSolicitud.curp === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.calle === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.colonia === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.ciudad === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.estado === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.municipio === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;


    if (datosSolicitud.direccion.cp === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.colonia === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.no_interior === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.no_exterior === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.direccion.cp === undefined)
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (datosSolicitud.telefonos.length === 0)
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

    if (typeof datosSolicitud.direccion !== "object")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.colonia !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.calle !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.colonia !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.ciudad !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.estado !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.municipio !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.no_interior !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.direccion.no_exterior !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (!validarCodigoPostal(datosSolicitud.direccion.cp))
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    datosSolicitud.telefonos.forEach(telefono => {
        if (!validarTelefono(telefono)) {
            resultadoValidacion = CodigosEstado.BAD_REQUEST;
        }
    });

    if (typeof datosSolicitud.apoyo_solicitado !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    if (typeof datosSolicitud.observaciones !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST;

    return resultadoValidacion;
}


function validarCURP(curp) {
    const regexCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    return regexCurp.test(curp)
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