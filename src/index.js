const { miniFramework } = require('./lib/mini-framework.js')
const { PORT } = require('./config.js')
const controllers = require('./controllers/index.js')

const server = miniFramework({ controllers, PORT })

module.exports = {
  server
}
