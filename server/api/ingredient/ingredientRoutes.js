const router = require('express').Router()
const controller = require('./ingredientController')

router.param('id', controller.params)

router
    .route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/list').get(controller.getList)

router.route('/:id').get(controller.getOne)

module.exports = router
