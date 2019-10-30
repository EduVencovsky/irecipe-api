const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientType = {
    solid: 0,
    liquid: 1,
    gas: 2
}

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    type: {
        type: Number,
        enum: Object.values(IngredientType),
        required: true
    }
})

module.exports = mongoose.model('ingredient', IngredientSchema)
