const Recipe = require('./recipeModel')
const _ = require('lodash')

exports.params = (req, res, next, id) => {
    Recipe.findById(id)
        .populate('author categories')
        .exec()
        .then(recipe => {
            if (!recipe) {
                next(new Error('No recipe with id ' + id))
            } else {
                req.recipe = recipe
                next()
            }
        })
        .catch(error => next(error))
}

exports.get = (req, res, next) => {
    Recipe.find({})
        .populate('author categories')
        .exec()
        .then(categories => res.json(categories))
        .catch(error => next(error))
}

exports.getOne = (req, res) => {
    res.json(req.recipe)
}

exports.put = (req, res, next) => {
    let recipe = req.recipe
    let update = req.body
    _.merge(recipe, update)
    recipe.save((error, savedRecipe) =>
        error ? next(error) : res.json(savedRecipe)
    )
}

exports.post = (req, res, next) => {
    let newRecipe = req.body
    Recipe.create(newRecipe)
        .then(recipe => res.json(recipe))
        .catch(error => next(error))
}

exports.delete = (req, res, next) => {
    req.recipe.remove((error, removed) => {
        if (error) {
            next(error)
        } else {
            res.json(removed)
        }
    })
}
