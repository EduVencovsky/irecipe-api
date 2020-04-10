const Ingredient = require('./ingredientModel')

exports.params = (req, res, next, id) => {
    Ingredient.find({ id })
        .exec()
        .then(ingredient => {
            if (!ingredient) {
                next(new Error('No post with id ' + id))
            } else {
                req.ingredient = ingredient
                next()
            }
        })
        .catch(error => next(error))
}

exports.get = (req, res, next) => {
    let search = {}
    let { field, value } = req.regexQuery || {}
    if (field && value) {
        search[field] = value
    }
    Ingredient.find(search)
        .exec()
        .then(ingredients => res.json(ingredients))
        .catch(error => next(error))
}

exports.getOne = (req, res) => {
    res.json(req.ingredient)
}

exports.post = (req, res, next) => {
    const ingredient = req.body
    Ingredient.create(ingredient)
        .then(ingredient => res.json(ingredient))
        .catch(error => next(error))
}

exports.getList = (req, res, next) => {
    const name = req.query.name || ''
    const top = parseInt(req.query.top) || 10
    console.log('name', name)
    console.log('top', top)
    Ingredient.find({ name: new RegExp(name, 'ig') })
        .limit(top)
        .then(ingredients => {
            console.log('ingredients', ingredients)
            res.json(ingredients)
        })
        .catch(error => next(error))
}
