const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeMilli: {
        type: Number,
        required: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ingredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: 'ingredient',
                required: true
            },
            measurement: {
                type: Schema.Types.ObjectId,
                ref: 'measurement',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('recipe', RecipeSchema)
