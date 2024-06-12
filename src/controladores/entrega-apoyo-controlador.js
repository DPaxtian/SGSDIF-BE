const EntregaApoyoServicio = require("../servicios/entrega-apoyo-servicios")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")
const Validaciones = require('../utileria/validaciones-joi')
const { HttpError, BadRequestError, NotFoundError } = require("../utileria/excepciones")

async function crearEntrega(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Entrega no creada :("

    try {
        let datosEntrega = req.body;

        const { error } = Validaciones.entregaValidacion.validate(datosEntrega)

        if (error) {
            codigoResultado = CodigosEstado.BAD_REQUEST
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            codigoResultado = await EntregaApoyoServicio.nuevaEntrega(datosEntrega);
        }

        if (codigoResultado === CodigosEstado.CREATED) {
            mensajeRespuesta = "Entrega creada con éxito :)";
        }
    } catch (error) {
        Logger.error(`Ha ocurrido un error en crearEntrega controlador: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta
    })
}

module.exports = crearEntrega
