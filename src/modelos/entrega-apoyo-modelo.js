const mongoose = require('mongoose')

const EntregaSchema = new mongoose.Schema(
    {
        fecha_de_entrega: {
            type: Date,
            required: true
        },
        identificador_de_apoyo: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        identificador_de_solicitud: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('entregas', EntregaSchema)
