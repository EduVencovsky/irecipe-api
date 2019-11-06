const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'recipes',
        }
    ],
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    }
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    this.password = this.encryptPassword(this.password)
    next()
})

UserSchema.methods = {
    authenticate: function (plainTextPassWord) {
        return bcrypt.compareSync(plainTextPassWord, this.password)
    },
    encryptPassword: function (plainTextPassWord) {
        if (!plainTextPassWord) return ''
        else {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(plainTextPassWord, salt)
        }
    }
}

module.exports = mongoose.model('user', UserSchema)
