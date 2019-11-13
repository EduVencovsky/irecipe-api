const router = require('express').Router()
const controller = require('./recipeController')
const { decodeToken, getFreshUser } = require('../../auth/auth')
const userValidation = [decodeToken(), getFreshUser()]

router.use(userValidation)

router.param('id', controller.params)

router
    .route('/')
    .get(controller.get)
    .post(controller.post)

router
    .route('/fullData/:id?')
    .get(controller.getFullRecipe)

router
    .route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

module.exports = router
