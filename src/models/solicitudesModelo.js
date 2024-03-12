const mongoose = require("mongoose");

const SolicitudesSchema = new mongoose.Schema(
    {
        
        curp: {
            type: String,
            required: true
        },
        numTelefono: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellidoPaterno: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('solicitudes', SolicitudesSchema);