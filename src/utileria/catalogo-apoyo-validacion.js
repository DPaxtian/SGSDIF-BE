const CodigosEstado = require("../utileria/codigos-estado")

function validarDatosApoyo(datosApoyo) {
    let resultadoValidacion = CodigosEstado.OK

    if(datosApoyo.identificador === undefined || typeof datosApoyo.identificador !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST

    if(datosApoyo.nombre === undefined || typeof datosApoyo.nombre !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST

    if(datosApoyo.tipo === undefined || (datosApoyo.tipo !== "Municipal" && datosApoyo.tipo !== "Estatal"))
        resultadoValidacion = CodigosEstado.BAD_REQUEST

    if(datosApoyo.cantidad === undefined || !Number.isInteger(datosApoyo.cantidad))
        resultadoValidacion = CodigosEstado.BAD_REQUEST

    if(datosApoyo.descripcion === undefined || typeof datosApoyo.descripcion !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST

    return resultadoValidacion
}



module.exports = {
    validarDatosApoyo
}