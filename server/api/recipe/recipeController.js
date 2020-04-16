const Recipe = require('./recipeModel')
const Ingredients = require('../ingredient/ingredientModel')
const Appliance = require('../appliance/applianceModel')
const logger = require('../../util/logger')
const _ = require('lodash')

exports.params = (req, res, next, _id) => {
    console.log('param req.user', req.user)
    console.log('_id', _id)

    Recipe.findOne({ _id, author: req.user._id })
        .populate('author', 'username email')
        .populate('ingredients.ingredient')
        .populate('appliances.appliance')
        .exec()
        .then(recipe => {
            if (!recipe) {
                next(new Error('No recipe with id ' + _id))
            } else {
                req.recipe = recipe
                next()
            }
        })
        .catch(error => {
            next(error)
        })
}

exports.get = (req, res, next) => {
    Recipe.find()
        .populate('author', 'firstname username email')
        .populate('ingredients', 'ingredient quantity measurement')
        .populate('appliances', 'appliance')
        .select('directions', 'direction order')
        .exec()
        .then(recipes => res.json(recipes))
        .catch(error => next(error))
}

exports.getMyRecipe = (req, res, next) => {
    let author = req.user

    Recipe.find({ author })
        .populate('ingredients.ingredient')
        .populate('appliances.appliances')
        .select('directions name time')
        .exec()
        .then(recipes => {
            logger.log(recipes)
            res.json(recipes)
        })
        .catch(error => {
            logger.log('errore', error)
            next(error)
        })
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
    console.log('old recipe ingredients', newRecipe.ingredients)
    newRecipe.ingredients = newRecipe.ingredients.map(x => ({
        ingredient: {
            _id: x._id,
            name: x.name,
            description: x.description,
            type: x.type,
        },
        quantity: x.quantity,
        measurement: x.measurement,        
    }))
    console.log('new recipe ingredients', newRecipe.ingredients)

    newRecipe.author = req.user
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

exports.getFullRecipe = async (req, res, next) => {
    let recipe = req.recipe ? req.recipe.toObject() : new Recipe().toObject()
    let ingredients = await Ingredients.find({}).lean()
    let appliances = await Appliance.find({}).lean()
    recipe.ingredients = mergeQuantity(ingredients, recipe.ingredients.map(x =>
        ({ ...x.ingredient, quantity: x.quantity }))
    )
    recipe.appliances = mergeQuantity(appliances, recipe.appliances.map(x =>
        ({ ...x.appliance, quantity: x.quantity }))
    )

    res.json(recipe)
}

exports.getRecipeByIngredient = (req, res, next) => {

    const { ingredients, searchType } = req.body

    Recipe.find({})
        .populate('author', 'username email')
        .populate('ingredients.ingredient')
        .populate('appliances.appliance')
        .exec()
        .then(modelRecipes => {
            const recipes = modelRecipes.map(recipe => recipe.toObject())
            const doableRecipes = getRecipeByIngredients(recipes, ingredients)
            // const byQuantity = getRecipeByIngredientsQuantity(recipes, ingredients)
            res.json(doableRecipes)
        })
        .catch(error => next(error))
}

const mergeQuantity = (apiData, selectedData, key = '_id') => {
    return apiData.map(ing => {
        const match = selectedData.find(x => x[key] && ing[key] && x[key].toString() == ing[key].toString())
        const quantity = match ? match.quantity : 0
        return { ...ing, quantity }
    })
}

const getRecipeByIngredients = (recipes, userIngredients) =>
    recipes.filter(recipe => {
        console.log(recipe.ingredients)
        return !recipe.ingredients.some(({ ingredient }) =>
            !userIngredients.map(x => x._id.toString()).includes(ingredient._id.toString())
        )
    })

const getRecipeByIngredientsQuantity = (recipes, userIngredients) =>
    recipes.filter(recipe =>
        !recipe.ingredients.some(({ ingredient, quantity }) => {
            const userIngredient = userIngredients.find(x => x._id.toString() === ingredient._id.toString())
            if (userIngredient)
                return quantity >= userIngredient.quantity
            return true
        })
    )
