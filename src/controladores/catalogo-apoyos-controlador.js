const CatalogoApoyosServicio = require("../servicios/catalogo-apoyos-servicios")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")
const ApoyoValidacon = require("../utileria/catalogo-apoyo-validacion")


async function crearApoyo(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Apoyo no creado :("

    try {
        let datosApoyo = req.body;

        if(ApoyoValidacon.validarDatosApoyo(datosApoyo) === CodigosEstado.BAD_REQUEST){
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


async function buscarApoyosPorTipo(req, res){
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR
    let datosResultado = []
    let mensajeRespuesta = "Ocurrio un error :("

    try{
        let tipoApoyo = req.params.tipo_apoyo

        datosResultado = await CatalogoApoyosServicio.buscarApoyoPorTipo(tipoApoyo)

        if(datosResultado.length === 0){
            codigoResultado = CodigosEstado.NOT_FOUND
            mensajeRespuesta = "No se han encontrado apoyos"
        } else {
            codigoResultado = CodigosEstado.OK
            mensajeRespuesta = `Apoyos de tipo ${tipoApoyo} encontrados`
        }
    } catch (error) {
        Logger.error(`Ha ocurrido un error en buscarApoyosPorTipo: ${error}`)
    }

    return res.status(codigoResultado).json({
        code: codigoResultado,
        msg: mensajeRespuesta,
        data: datosResultado
    })
}

module.exports = {
    crearApoyo,
    buscarApoyosPorTipo
}