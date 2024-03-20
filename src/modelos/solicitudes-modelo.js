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
                type: String,
                required: true
            },
            ciudad:{
                type: String,
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
            },
            cp: {
                type: String,
                required: true
            }
        },
        telefonos: [

        ],
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