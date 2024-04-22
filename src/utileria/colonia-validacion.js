const CodigosEstado = require("../utileria/codigos-estado")

function validarDatosColonia(datosColonia) {
    let resultadoValidacion = CodigosEstado.OK

    if(datosColonia.nombre_colonia === undefined || typeof datosColonia.nombre_colonia !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST
    if(datosColonia.nivel_marginacion === undefined || typeof datosColonia.nivel_marginacion !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST
    if(datosColonia.codigo_postal === undefined || typeof datosColonia.codigo_postal !== "string")
        resultadoValidacion = CodigosEstado.BAD_REQUEST
    

    return resultadoValidacion
}



module.exports = {
    validarDatosColonia
}