const config  = require('./server/config/config')
const app = require('./server/server')

const logger = require('./server/util/logger')

app.listen(config.port)
logger.log(`Listem on port ${config.port}`)
