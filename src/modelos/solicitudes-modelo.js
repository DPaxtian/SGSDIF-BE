const mongoose = require("mongoose");

const SolicitudesSchema = new mongoose.Schema(
    {
        
        no: {
            type: Number,
            required: true
        },
        fecha_captura: {
            type: Date,
            default: ""
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
        },
        curp: {
            type: String,
            required: true
        },
        direccion: {
            calle:{
                type: String,
                required: true
            },
            colonia: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            estado:{
                type: String,
                required: true
            },
            municipio:{
                type: String,
                required: true
            },
            no_exterior:{
                type: String,
                required: true
            },
            no_interior:{
                type: String,
                required: true
            }
        },
        telefonos: {
            type: Array,
            default: [],
            required: true
        },
        apoyo_solicitado: {
            type: mongoose.Schema.Types.ObjectId,
            default: ""
        },
        observaciones: {
            type: String,
            default: ""
        },
        archivos: {
            type: Array,
            default: []
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('solicitudes', SolicitudesSchema);