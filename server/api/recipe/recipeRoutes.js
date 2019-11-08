const router = require('express').Router()
const controller = require('./recipeController')
const { decodeToken, getFreshUser } = require('../../auth/auth')
const userValidation = [decodeToken(), getFreshUser()]

router.param('id', controller.params)

router
    .route('/')
    .get(controller.get)
    .post(userValidation, controller.post)

router
    .route('/fullData/:id?')
    .get(controller.getFullRecipe)

router
    .route('/:id')
    .get(controller.getOne)
    .put(userValidation, controller.put)
    .delete(userValidation, controller.delete)

module.exports = router
