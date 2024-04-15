const mongoose = require("mongoose")

const CatalogoApoyosSchema = mongoose.Schema(
    {
        identificador: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true,
            enum: ["Municipal", "Estatal"]
        },
        cantidad: {
            type: Number,
            required: true,
        },
        descripcion: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("catalogo_apoyos", CatalogoApoyosSchema)