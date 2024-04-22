const mongoose = require('mongoose')

const ColoniasMarginalesSchema = mongoose.Schema(
    {
        nombre_colonia: {
            type: String,
            require: true
        },
        nivel_marginacion:{
            type: String,
        },
        codigo_postal:{
            type: String,
            require: true
        }
    }
)

module.exports =  mongoose.model("colonias", ColoniasMarginalesSchema)