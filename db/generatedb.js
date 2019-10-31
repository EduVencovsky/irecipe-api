const axios = require('axios')
const users = require('./users.json')
const ingredients = require('./ingredients.json')
const measurements = require('./measurements.json')
const appliances = require('./appliances.json')

const uri = 'http://localhost:3000/'

const UserModel = require('../server/api/user/userModel')

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
    UserModel.deleteMany()
}
// deleteUsers()
generatedb()
