const EntregaApoyo = require("../modelos/entrega-apoyo-modelo")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")
const { HttpError, BadRequestError, InternalServerError, NotFoundError } = require('../utileria/excepciones')

async function nuevaEntrega(infoEntrega) {
    try {
        const entregaEncontrada = await EntregaApoyo.findOne({ "identificador_de_solicitud": infoEntrega.identificador_de_solicitud })
        if (entregaEncontrada !== null) {
            throw new BadRequestError("La solicitud ya tiene una entrega existente")
        } else {
            const entrega = new EntregaApoyo(infoEntrega)
            await entrega.save()
        }
        return CodigosEstado.CREATED
    } catch (error) {
        Logger.error(`Ha ocurrido un error en el servidor: ${error}`)
        if (error instanceof HttpError) {
            throw error
        } else {
            throw new InternalServerError("Ha ocurrido un error en el servidor")
        }
    }
}

module.exports = {nuevaEntrega}
