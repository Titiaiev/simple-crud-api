const { Controller } = require('../lib/controller/index.js')

class NotFound extends Controller {
  static route () {
    return {
      path: '*'
    }
  }

  controller (body, params) {
    return {
      code: 404,
      res: { msg: 'Not Found' }
    }
  }
}

module.exports = {
  NotFound
}
