const mongoose = require('mongoose')

const ColoniasMarginalesSchema = mongoose.Schema(
    {
        nombreColonia: {
            type: String,
            require: true
        },
        nivelMarginacion:{
            type: Number,
            require: true
        }
    }
)

module.exports =  mongoose.model("colonias_marginales", ColoniasMarginalesSchema)