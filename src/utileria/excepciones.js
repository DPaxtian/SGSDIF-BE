const CodigosEstado = require("../utileria/codigos-estado")

class HttpError extends Error {
    constructor(codigoDeEstado, mensaje) {
        super(mensaje);
        this.name = 'HttpError';
        this.codigoEstado = codigoDeEstado;
    }
}

class NotFoundError extends HttpError {
    constructor(mensaje = 'Recurso no encontrado') {
        super(CodigosEstado.NOT_FOUND, mensaje);
    }
}

class BadRequestError extends HttpError {
    constructor(mensaje = 'Solicitud incorrecta') {
        super(CodigosEstado.BAD_REQUEST, mensaje);
    }
}

class InternalServerError extends HttpError {
    constructor(mensaje = "El sistema no esta disponible, intentelo mas tarde"){
        super(CodigosEstado.INTERNAL_SERVER_ERROR, mensaje)
    }
}

module.exports = {
    HttpError,
    BadRequestError,
    NotFoundError,
    InternalServerError
};