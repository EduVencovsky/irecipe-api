const axios = require('axios')

const uri = 'http://localhost:3000/'
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzNGJjZjUwMzRkZjIzZTQ4NGYwNWMiLCJpYXQiOjE1NjU4MjM2NTEsImV4cCI6MTU2NjY4NzY1MX0.T-GYP9kQP9fnztiESsmNpisNg7tQl9nToU8j86ftJI0'
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

// axios
//     .post('/api/recipe', {
//         name: 'Milk Egg And Chocolate',
//         description: 'Delicious browned egg',
//         ingredients: [
//             {
//                 ingredient: '5d535882307f79390ca3fb9d', // chocolate
//                 measurement: '5d535d9591ec3014c893f761',
//                 quantity: 350
//             },
//             {
//                 ingredient: '5d5358e8af1b51368c4efdcd', // egg
//                 measurement: '5d535d5ca00bfe41a441ae39',
//                 quantity: 2
//             },
//             {
//                 ingredient: '5d53597a84eaa531009dd14e', // milk
//                 measurement: '5d535d753811623d8061ca65',
//                 quantity: 1
//             }
//         ]
//     })
//     .then(consoleThen)
//     .catch(consoleCatch)
