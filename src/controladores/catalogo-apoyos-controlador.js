const CatalogoApoyosServicio = require("../servicios/catalogo-apoyos-servicios")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")
const Validaciones = require('../utileria/validaciones-joi')
const { HttpError, BadRequestError, NotFoundError } = require("../utileria/excepciones")


async function crearApoyo(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Apoyo no creado :("

    try {
        let datosApoyo = req.body;

        const { error } = Validaciones.catalogosValidacion.validate(datosApoyo)

        if (error) {
            codigoResultado = CodigosEstado.BAD_REQUEST
            mensajeRespuesta = 'Información incompleta o erronea, por favor verifiquela';
            throw new Error('Información incompleta o erronea, por favor verifiquela');
        } else {
            codigoResultado = await CatalogoApoyosServicio.nuevoApoyo(datosApoyo);
        }

        if (codigoResultado === CodigosEstado.CREATED) {
            mensajeRespuesta = "Apoyo creado con éxito :)";
        }
    } catch (error) {
        Logger.error(`Ha ocurrido un error en crearApoyo controlador: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta
    })
}


async function buscarApoyosPorTipo(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR
    let datosResultado = []
    let mensajeRespuesta = "Ocurrio un error :("

    try {
        let tipoApoyo = req.params.tipo_apoyo

        datosResultado = await CatalogoApoyosServicio.buscarApoyoPorTipo(tipoApoyo)

        if (datosResultado.length === 0) {
            codigoResultado = CodigosEstado.NOT_FOUND
            mensajeRespuesta = "No se han encontrado apoyos"
        } else {
            codigoResultado = CodigosEstado.OK
            mensajeRespuesta = `Apoyos de tipo ${tipoApoyo} encontrados`
        }

        return res.status(codigoResultado).json({
            code: codigoResultado,
            msg: mensajeRespuesta,
            data: datosResultado
        })

    } catch (error) {
        exceptionMessage = ""
        exceptionCode = ""

        if (error instanceof HttpError) {
            exceptionCode = error.codigoEstado
            exceptionMessage = error.message
        } else {
            exceptionCode = CodigosEstado.INTERNAL_SERVER_ERROR
            exceptionMessage = "Ha ocurrido un error en obtenerUsuarios controlador"
        }

        Logger.error(`Error al obtener usuarios: ${error}`)
        return res.status(exceptionCode).json({
            code: exceptionCode,
            msg: exceptionMessage
        });
    }
}


async function actualizarApoyo(req, res) {
    try {
        const id_apoyo = req.params.id_apoyo
        const apoyo_actualizado = req.body

        const resultado = await CatalogoApoyosServicio.actualizarApoyo(id_apoyo, apoyo_actualizado)

        return res.status(resultado).json({
            code: resultado,
            msg: "Apoyo actualizado con éxito :)"
        })
    } catch (error) {
        exceptionMessage = ""
        exceptionCode = ""

        if (error instanceof HttpError) {
            exceptionCode = error.codigoEstado
            exceptionMessage = error.message
        } else {
            exceptionCode = CodigosEstado.INTERNAL_SERVER_ERROR
            exceptionMessage = "Ha ocurrido un error en obtenerUsuarios controlador"
        }

        Logger.error(`Error al obtener usuarios: ${error}`)
        return res.status(exceptionCode).json({
            code: exceptionCode,
            msg: exceptionMessage
        });
    }
}


async function eliminarApoyo(req, res){
    try{
        const id_apoyo = req.params.id_apoyo

        const resultado = await CatalogoApoyosServicio.eliminarApoyo(id_apoyo)

        return res.status(resultado).json({
            code: resultado,
            msg: "Apoyo eliminado con éxito :)"
        })
    } catch (error) {
        exceptionMessage = ""
        exceptionCode = ""

        if (error instanceof HttpError) {
            exceptionCode = error.codigoEstado
            exceptionMessage = error.message
        } else {
            exceptionCode = CodigosEstado.INTERNAL_SERVER_ERROR
            exceptionMessage = "Ha ocurrido un error en obtenerUsuarios controlador"
        }

        Logger.error(`Error al obtener usuarios: ${error}`)
        return res.status(exceptionCode).json({
            code: exceptionCode,
            msg: exceptionMessage
        });
    }
}

module.exports = {
    crearApoyo,
    buscarApoyosPorTipo,
    actualizarApoyo,
    eliminarApoyo
}