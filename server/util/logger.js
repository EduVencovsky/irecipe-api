require('colors')
const _ = require('lodash')

const config = require('../config/config')

const noop = () => { }

const consoleLog = config.logging ? console.log.bind(console) : noop

const logger = {
    log(){
        const args = _.toArray(arguments)
            .map(arg => {
                if (typeof arg === 'object') {
                    let str = JSON.stringify(arg, 2)
                    return str.cyan
                } else {
                    arg += ''
                    return arg.cyan
                }
            })
        consoleLog.apply(console, args)
    }
}

module.exports = logger