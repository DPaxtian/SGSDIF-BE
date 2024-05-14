const mongoose = require('mongoose')

const ColoniasMarginalesSchema = mongoose.Schema(
    {
        clave: {
            type: String,
            require: true
        },
        nombre_colonia: {
            type: String,
            require: true
        },
        cp:{
            type: String,
            require: true
        },
        grado_marginacion:{
            type: String,
            require: true
        },
        clasificacion: {
            type: String,
            require: true
        },
        habitantes: {
            type: Number,
            required: true
        },
        viviendas_habitadas: {
            type: Number,
            required: true
        },
        familias: {
            type: Number,
            require: true
        },
        tipo: {
            type: String,
            require: true
        }
    }
)

module.exports =  mongoose.model("colonias", ColoniasMarginalesSchema)