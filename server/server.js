const express = require('express')
const app = express()
const api = require('./api')
const auth = require('./auth/routes')
const config = require('./config/config')
const mongoose = require('mongoose')
// connect to mongodb
mongoose.connect(config.db.url, { useCreateIndex: true, useNewUrlParser: true })

if (config.env === config.dev) {
    mongoose.set('debug', true)
}
// setup app middleware
require('./middleware/appMiddleware')(app)

// setup api router
app.use('/api', api)

// setup auth router
app.use('/auth', auth)

module.exports = app
