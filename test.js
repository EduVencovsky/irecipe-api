const axios = require('axios')

const uri = 'http://localhost:3000/'
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzNGJjZjUwMzRkZjIzZTQ4NGYwNWMiLCJpYXQiOjE1NjU3NDAwMTAsImV4cCI6MTU2NjYwNDAxMH0.oIGO2A98YUN93qqMxPyTRsSExtZkX4UUIz9AXPDRV3g'
const consoleThen = res => console.log(res.data)
const consoleCatch = error => console.log(error.response.data)

axios.default.defaults.baseURL = uri
axios.default.defaults.headers.common.Authorization = 'Bearer ' + token

// axios
//     .get('/api/user')
//     .then(consoleThen)
//     .catch(consoleCatch)

// axios
//     .post('/api/user', {
//         username: 'admin',
//         password: 'admin',
//         email: 'admin@admin.com'
//     })
//     .then(consoleThen)
//     .catch(consoleCatch)

// axios
//     .post('/auth/signin', {
//         username: 'edu',
//         password: 'edu',
//         email: 'edu@edu.com'
//     })
//     .then(consoleThen)
//     .catch(consoleCatch)

// axios
//     .post('/api/ingredient', {
//         name: 'milk',
//         description: 'Muuuu juice'
//     })
//     .then(consoleThen)
//     .catch(consoleCatch)

// axios
//     .post('/api/measurement', {
//         name: 'kilogram',
//         symbol: 'kg'
//     })
//     .then(consoleThen)
//     .catch(consoleCatch)
