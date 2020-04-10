const User = require('./userModel')
const Ingredient = require('../ingredient/ingredientModel')
const Appliance = require('../appliance/applianceModel')
const _ = require('lodash')

exports.params = (req, res, next, id) => {
    User.findById(id)
        .then(user => {
            if (!user) {
                next(new Error('No user with id ' + id))
            } else {
                req.user = user
                next()
            }
        })
        .catch(error => next(error))
}

exports.get = (req, res, next) => {
    User.find({})
        .select('-password')
        .then(users => res.json(users))
        .catch(error => next(error))
}

exports.getOne = (req, res, next) => {
    res.json(req.user)
}

exports.put = (req, res, next) => {
    let user = req.user
    let update = req.body
    console.log('UPDATE', update)
    _.merge(user, update)
    user.save((error, savedUser) => (error ? next(error) : res.json(savedUser)))
}

exports.post = (req, res, next) => {
    let newUser = req.body
    User.create(newUser)
        .then(user => res.json(user))
        .catch(error => next(error))
}

exports.delete = (req, res, next) => {
    req.user.remove((error, removed) => {
        if (error) {
            next(error)
        } else {
            res.json(removed)
        }
    })
}

exports.updateIngredients = async (req, res, next) => {
    let user = req.user
    user.ingredients = await Ingredient.find().where('_id').in(req.body.ingredients).exec()
    user.save((error, savedUser) => (error ? next(error) : res.json(savedUser)))
}

exports.updateAppliances = async (req, res, next) => {
    let user = req.user
    user.appliances = await Appliance.find().where('_id').in(req.body.appliances).exec()
    user.save((error, savedUser) => (error ? next(error) : res.json(savedUser)))
}
