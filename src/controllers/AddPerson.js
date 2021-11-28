const { Person } = require('../models/person.js')
const { Controller } = require('../lib/controller/index.js')

class AddPerson extends Controller {
  static route () {
    return {
      path: '/person',
      method: Controller.METHOD.post
    }
  }

  controller (body, params) {
    if (new Person().add(body)) {
      return {
        code: 201,
        res: 'done'
      }
    }
  }
}

module.exports = {
  AddPerson
}
