const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'categories',
    }]
})

module.exports = mongoose.model('posts', PostSchema)