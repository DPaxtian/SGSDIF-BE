const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido_paterno: {
            type: String,
            required: true
        },
        apellido_materno:{
            type: String,
        },
        correo_electronico: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            required: true
        },
        nombre_usuario: {
            type: String,
            required: true
        },
        contrasena: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('usuarios', UsuarioSchema)