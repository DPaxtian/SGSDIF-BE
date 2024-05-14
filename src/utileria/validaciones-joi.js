const Joi = require('joi')


const solicitudValidacion = Joi.object({
    no: Joi.number().required(),
    fecha_captura: Joi.string().isoDate(),
    nombre: Joi.string().required(),
    apellido_paterno: Joi.string().required(),
    apellido_materno: Joi.string(),
    curp: Joi.string().regex(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/).required(),
    direccion: Joi.object().required(),
    telefonos: Joi.array().required(),
    apoyo_solicitado: Joi.string(),
    observaciones: Joi.string(),
    archivos: Joi.array()
})


const coloniasValidacion = Joi.object({
    clave: Joi.string().required(),
    nombre_colonia: Joi.string().required(),
    cp: Joi.string().required(),
    grado_marginacion: Joi.string().required(),
    clasificacion: Joi.string().required(),
    habitantes: Joi.number().required(),
    viviendas_habitadas: Joi.number().required(),
    familias: Joi.number().required(),
    tipo: Joi.string().required()
})


const catalogosValidacion = Joi.object({
    identificador: Joi.string().required(),
    nombre: Joi.string().required(),
    tipo: Joi.string().valid("Municipal", "Estatal").required(),
    cantidad: Joi.number().required(),
    descripcion: Joi.string().required()
})


const usuarioValidacion = Joi.object({
    nombre: Joi.string().required(),
    apellido_paterno: Joi.string().required(),
    apellido_materno: Joi.string(),
    correo_electronico: Joi.string().required().email(),
    rol: Joi.string().valid("Administrador", ).required(),
    nombre_usuario: Joi.string().required(),
    contrasena: Joi.string().required().regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
})


const inicioSesionValidacion = Joi.object({
    nombre_usuario: Joi.string().required(),
    contrasena: Joi.string().required()
})


const curpValidacion = Joi.string().regex(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/).required()


module.exports = {
    solicitudValidacion,
    coloniasValidacion,
    catalogosValidacion,
    usuarioValidacion,
    inicioSesionValidacion,
    curpValidacion
}