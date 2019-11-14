const router = require('express').Router()
const controller = require('./recipeController')
const { decodeToken, getFreshUser } = require('../../auth/auth')
const userValidation = [decodeToken(), getFreshUser()]

router.use(userValidation)

router
    .route('/ingredientSearch')
    .post(controller.getRecipeByIngredient)

router
    .route('/')
    .get(controller.get)
    .post(controller.post)

router.param('id', controller.params)

router
    .route('/fullData/:id?')
    .get(controller.getFullRecipe)

router
    .use(userValidation)
    .route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

module.exports = router
