class HttpError extends Error {
    constructor(codigoDeEstado, mensaje) {
        super(mensaje);
        this.name = 'HttpError';
        this.codigoEstado = codigoDeEstado;
    }
}

class NotFoundError extends HttpError {
    constructor(mensaje = 'Recurso no encontrado') {
        super(404, mensaje);
    }
}

class BadRequestError extends HttpError {
    constructor(mensaje = 'Solicitud incorrecta') {
        super(400, mensaje);
    }
}

module.exports = {
    HttpError,
    BadRequestError,
    NotFoundError,
};


