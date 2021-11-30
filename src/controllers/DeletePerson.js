const { Person } = require('../models/person.js')
const { Controller } = require('../lib/controller/index.js')
const { NOT_FOUND_RESPONS, invalidParamsRespons } = require('../lib/constants.js')

class DeletePerson extends Controller {
  static route () {
    return {
      path: '/person/:personId',
      method: Controller.METHOD.delete
    }
  }

  controller (_, params) {
    try {
      Person.isUUID(params.personId)
    } catch (e) {
      return invalidParamsRespons(e.message)
    }
    const person = new Person().delete(params.personId)
    if (!person) {
      return NOT_FOUND_RESPONS
    } else {
      return {
        code: 204,
        res: ''
      }
    }
  }
}

module.exports = {
  DeletePerson
}
