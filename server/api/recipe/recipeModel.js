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
    time: {
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
                ref: 'ingredients',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    appliances: [{
        appliance: {
            type: Schema.Types.ObjectId,
            ref: 'appliances',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]

})

module.exports = mongoose.model('recipe', RecipeSchema)
