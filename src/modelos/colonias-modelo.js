const mongoose = require('mongoose')

const ColoniasMarginalesSchema = mongoose.Schema(
    {
        nombre_colonia: {
            type: String,
            require: true
        },
        categoria: {
            type: String,
            require: true
        },
        nivel_marginacion:{
            type: String,
            require: true
        },
        poblacion: {
            type: Number,
            required: true
        },
        codigo_postal:{
            type: String,
            require: true
        },
        clave_ageb: {
            type: String,
            require: true
        }
    }
)

module.exports =  mongoose.model("colonias", ColoniasMarginalesSchema)