const mongoose = require("mongoose");

const SolicitudesSchema = new mongoose.Schema(
    {
        
        no: {
            type: Number,
            required: true
        },
        fecha_captura: {
            type: Date,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido_paterno: {
            type: String,
            required: true
        },
        apellido_materno: {
            type: String,
            required: true
        },
        curp: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        colonia: {
            type: String,
            required: true
        },
        cp: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        apoyo_solicitado: {
            type: String,
            required: true
        },
        observaciones: {
            type: String,
            required: true
        }
        
    },
    { versionKey: false }
);

module.exports = mongoose.model('solicitudes', SolicitudesSchema);