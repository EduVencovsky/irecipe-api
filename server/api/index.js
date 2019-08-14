const router = require('express').Router()
const user = require('./user/userRoutes')
const measurement = require('./measurement/measurementRoutes')
const recipe = require('./recipe/recipeRoutes')
const ingredient = require('./ingredient/ingredientRoutes')

// router.use('/', (req, res, next) => res.send('Hello World!'))
router.use('/user', user)
router.use('/recipe', recipe)
router.use('/ingredient', ingredient)
router.use('/measurement', measurement)

module.exports = router
