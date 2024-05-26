const ColoniasServicio = require('../servicios/colonias_servicios')
const Logger = require('../configuracion/logger')
const CodigosEstado = require('../utileria/codigos-estado')
const Validaciones = require('../utileria/validaciones-joi')
const { HttpError, BadRequestError, NotFoundError } = require("../utileria/excepciones")


async function crearColonia(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR
    let mensajeRespuesta = 'Ocurrio un error :('

    try{
        let datosColonia = req.body

        const { error } = Validaciones.coloniasValidacion.validate(datosColonia)

        if(error){
            codigoResultado = CodigosEstado.BAD_REQUEST
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            codigoResultado = await ColoniasServicio.nuevaColonia(datosColonia)
        }

        if(codigoResultado === CodigosEstado.CREATED){
            mensajeRespuesta = 'Colonia creada con exito :)'
        }
    } catch(error){
        Logger.error(`Ha ocurrido un error en crearColonia controlador: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta
    })
}


async function obtenerColonias(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR
    let datosResultado = []
    let mensajeRespuesta = "Ocurrio un error :("

    try{
        datosResultado = await ColoniasServicio.obtenerColonias()

        if(datosResultado.length === 0){
            codigoResultado = CodigosEstado.NOT_FOUND
            mensajeRespuesta = "No se han encontrado colonias"
        } else {
            codigoResultado = CodigosEstado.OK
            mensajeRespuesta = "Colonias encontradas correctamente"
        }
    } catch (error) {
        Logger.error(`Ha ocurrido un error en obtenerColonias controlador: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta,
        data: datosResultado
    })
}


module.exports = {
    crearColonia,
    obtenerColonias
}