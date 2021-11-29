const { Person } = require('../models/person.js')
const { Controller } = require('../lib/controller/index.js')
const { invalidParamsRespons, createdRespons } = require('../lib/constants.js')

class AddPerson extends Controller {
  static route () {
    return {
      path: '/person',
      method: Controller.METHOD.post
    }
  }

  controller (body, _) {
    try {
      const createdUser = new Person().add(body)
      if (createdUser) {
        return createdRespons(createdUser)
      }
    } catch (e) {
      return invalidParamsRespons(e.message)
    }
  }
}

module.exports = {
  AddPerson
}
