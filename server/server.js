const express = require('express')
const app = express()
const api = require('./api')
const auth = require('./auth/routes')
const config = require('./config/config')
const mongoose = require('mongoose')
const logger = require('./util/logger')
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

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('UnauthorizedError, No Token found')
        return res.status(401).send(err.message)
    }
    logger.log(err)
    res.send(err)
})

module.exports = app
