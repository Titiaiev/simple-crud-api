const { Controller } = require('../lib/controller/index.js')
const { NOT_FOUND_RESPONS } = require('../lib/constants.js')

class NotFound extends Controller {
  static route () {
    return {
      path: '*'
    }
  }

  controller () {
    return NOT_FOUND_RESPONS
  }
}

module.exports = {
  NotFound
}
