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
    try {
      const createdUser = new Person().add(body)
      if (createdUser) {
        return {
          code: 201,
          res: createdUser
        }
      }
    } catch (e) {
      return {
        code: 400,
        res: e.message
      }
    }
  }
}

module.exports = {
  AddPerson
}
