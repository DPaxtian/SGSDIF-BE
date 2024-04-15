const CatalogoApoyos = require("../modelos/catalogo-apoyos")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")


async function nuevoApoyo(infoApoyo) {
    return new Promise((resolve, reject) => {
        let datosApoyo = new CatalogoApoyos(infoApoyo);

        datosApoyo.save()
        .then(() => {
            resolve(CodigosEstado.CREATED);
        })
        .catch((error) => {
            reject(CodigosEstado.INTERNAL_SERVER_ERROR);
            Logger.error(`Error creando el apoyo: ${error}`)
        })
    })
}


async function buscarApoyoPorTipo(tipoApoyo) {
    return new Promise((resolve, reject) => {
        let resultadoApoyo = CatalogoApoyos.find({tipo: tipoApoyo})
        .then((resultadoApoyo) => {
            resolve(resultadoApoyo)
        })
        .catch((error) => {
            reject(CodigosEstado.NOT_FOUND)
            Logger.error(`Error buscando los apoyos: ${error}`)
        })
    })
}


module.exports = {
    nuevoApoyo,
    buscarApoyoPorTipo
}