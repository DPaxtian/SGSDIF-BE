const Colonia = require('../modelos/colonias-modelo')
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')


async function nuevaColonia(colonia) {
    return new Promise((resolve, reject) => {
        let datosColonia = new Colonia(colonia)

        datosColonia.save()
        .then(() => {
            resolve(CodigosEstado.CREATED)
        })
        .catch((error) => {
            Logger.error(`Ha ocurrido un error guardando la nueva colonia: ${error}`)
            reject(CodigosEstado.INTERNAL_SERVER_ERROR)
        })
    })
}


async function obtenerColonias() {
    return new Promise((resolve, reject) => {
        let coloniasResultado = Colonia.find({})
        .then((coloniasResultado) => {
            resolve(coloniasResultado)
        })
        .catch((error) => {
            Logger.error(`Ha ocurrido un error obteniendo las colonias: ${error}`)
            reject(CodigosEstado.INTERNAL_SERVER_ERROR)
        })
    })
}


async function obtenerColoniasPersonalizado(query){
    try {
        const colonias_resultado = await Colonia.find(query);

        return colonias_resultado;
    } catch (error) {
        Logger.error("Ha ocurrido un error buscando las colonias");
        throw new InternalServerError("Ha ocurrido un error interno buscando las colonias");
    }
}


module.exports = {
    nuevaColonia,
    obtenerColonias,
    obtenerColoniasPersonalizado,
}