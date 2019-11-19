const axios = require('axios')
const users = require('./users.json')
const ingredients = require('./ingredients.json')
const measurements = require('./measurements.json')
const appliances = require('./appliances.json')
const config = require('../server/config/config')
const mongoose = require('mongoose')

const uri = 'http://localhost:3000/'

mongoose.connect(config.db.url, { useCreateIndex: true, useNewUrlParser: true })

const UserModel = require('../server/api/user/userModel')
const RecipeModel = require('../server/api/recipe/recipeModel')
const ApplianceModel = require('../server/api/appliance/applianceModel')
const IngredientModel = require('../server/api/ingredient/ingredientModel')

const consoleThen = res => console.log(res.data)
const consoleCatch = error => console.log(error.response)

let token = ''

axios.default.defaults.baseURL = uri

const generatedb = async () => {
    const usersPromises = users.map(user => axios.post('/api/user', user))
    await Promise.all(usersPromises)
        .then(values => consoleThen(values))
        .catch(consoleCatch)

    await axios
        .post('/auth/signin', users[0])
        .then(res => {
            token = res.data.token
            console.log('Current User ' + users[0])
            console.log('Token ' + token)
        })
        .catch(consoleCatch)

    axios.default.defaults.headers.common.Authorization = 'Bearer ' + token

    const ingredientsPromises = ingredients.map(ingredient =>
        axios.post('/api/ingredient', ingredient)
    )
    await Promise.all(ingredientsPromises)
        .then(values => values.map(value => consoleThen(value)))
        .catch(consoleCatch)

    const measurementsPromises = measurements.map(measurement =>
        axios.post('/api/measurement', measurement)
    )
    await Promise.all(measurementsPromises)
        .then(values => values.map(value => consoleThen(value)))
        .catch(consoleCatch)

    const appliancesPromises = appliances.map(appliance =>
        axios.post('/api/appliance', appliance)
    )
    await Promise.all(appliancesPromises)
        .then(values => values.map(value => consoleThen(value)))
        .catch(consoleCatch)
}

const deleteUsers = () => {
    UserModel.deleteMany({})
        .then(consoleThen)
        .catch(consoleCatch)
}
const deleteAppliances = () => {
    ApplianceModel.deleteMany({})
        .then(consoleThen)
        .catch(consoleCatch)
}
const deleteIngredients = () => {
    IngredientModel.deleteMany({})
        .then(consoleThen)
        .catch(consoleCatch)
}
const deleteRecipes = () => {
    RecipeModel.deleteMany({})
        .then(consoleThen)
        .catch(consoleCatch)
}

const deleteAll = () => {
    deleteUsers()
    deleteAppliances()
    deleteIngredients()
    deleteRecipes()
}
// deleteAll()
// generatedb()
