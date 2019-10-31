const router = require('express').Router()

const user = require('./user/userRoutes')
const recipe = require('./recipe/recipeRoutes')
const appliance = require('./appliance/applianceRoutes')
const ingredient = require('./ingredient/ingredientRoutes')
const measurement = require('./measurement/measurementRoutes')

router.use('/user', user)
router.use('/recipe', recipe)
router.use('/appliance', appliance)
router.use('/ingredient', ingredient)
router.use('/measurement', measurement)

module.exports = router
