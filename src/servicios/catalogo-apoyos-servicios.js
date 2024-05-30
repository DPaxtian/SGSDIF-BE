const CatalogoApoyos = require("../modelos/catalogo-apoyos")
const Logger = require("../configuracion/logger")
const CodigosEstado = require("../utileria/codigos-estado")
const { HttpError, BadRequestError, InternalServerError, NotFoundError } = require('../utileria/excepciones')


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


async function buscarApoyoPorTipo() {
    try {
        const resultadoApoyo = await CatalogoApoyos.find();

        if (!resultadoApoyo || resultadoApoyo.length === 0) {
            throw new NotFoundError("No se encontraron apoyos");
        } else {
            return resultadoApoyo;
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            Logger.warn(`No se encontraron apoyos`);
            throw error;
        } else {
            Logger.error("Error buscando los apoyos");
            throw new InternalServerError("Ha ocurrido un error interno buscando los apoyos");
        }
    }
}



async function actualizarApoyo(id_apoyo, datos_actualizados) {
    try {
        const apoyo_encontrado = await CatalogoApoyos.findByIdAndUpdate(id_apoyo, datos_actualizados, { new: true });

        if (apoyo_encontrado === null) {
            throw new NotFoundError(`No se ha encontrado el apoyo con el id: ${id_apoyo}`);
        } else {
            return CodigosEstado.OK;
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            Logger.warn(`No se encontró el apoyo con el id: ${id_apoyo}`);
            throw error;
        } else {
            Logger.error("Ha ocurrido un error actualizando el apoyo", { error, id_apoyo, datos_actualizados });
            throw new InternalServerError("Ha ocurrido un error interno actualizando el apoyo");
        }
    }
}



async function eliminarApoyo(id_apoyo) {
    try {
        const apoyo_eliminado = await CatalogoApoyos.findByIdAndDelete(id_apoyo);

        if (apoyo_eliminado === null) {
            throw new NotFoundError(`No se ha encontrado el apoyo con el id: ${id_apoyo}`);
        } else {
            return CodigosEstado.OK;
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            Logger.warn(`No se encontró el apoyo con el id: ${id_apoyo}`);
            throw error;
        } else {
            Logger.error("Ha ocurrido un error eliminando el apoyo", { error, id_apoyo });
            throw new InternalServerError("Ha ocurrido un error interno eliminando el apoyo");
        }
    }
}



module.exports = {
    nuevoApoyo,
    buscarApoyoPorTipo,
    actualizarApoyo,
    eliminarApoyo
}