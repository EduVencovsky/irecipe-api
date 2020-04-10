const router = require('express').Router()
const controller = require('./userController')

router.param('id', controller.params)

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/ingredients/:id')
    .put(controller.updateIngredients)

router.route('/appliances/:id')
    .put(controller.updateAppliances)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)

module.exports = router

