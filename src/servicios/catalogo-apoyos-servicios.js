const CatalogoApoyos = require("../modelos/catalogo-apoyos")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")


async function nuevoApoyo(infoApoyo) {
    try {
        const apoyoEncontrado = await CatalogoApoyos.findOne({ "identificador": infoApoyo.identificador })

        if (apoyoEncontrado !== null) {
            apoyoEncontrado.cantidad += infoApoyo.cantidad

            apoyoEncontrado.save()
        } else {
            const apoyo = new CatalogoApoyos(infoApoyo)

            apoyo.save()
        }
        return CodigosEstado.CREATED
    } catch (error) {
        Logger.error(`Ha ocurrido un error en el servidor: ${error}`)
        throw new InternalServerError("Ha ocurrido un error en el servidor")
    }

}


async function buscarApoyoPorTipo(tipoApoyo) {
    return new Promise((resolve, reject) => {
        let resultadoApoyo = CatalogoApoyos.find({ tipo: tipoApoyo })
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