const _ = require('lodash')

let config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    expireTime: 24 * 60 * 60 * 10,
    secrets: {
        jwt: process.env.JWT || 'guacamolehohoho'
    }
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev
config.env = process.env.NODE_ENV

let envConfig
try {
    envConfig = require('./' + config.env) || {}
} catch (e) {
    envConfig = {}
}

module.exports = _.merge(config, envConfig)
