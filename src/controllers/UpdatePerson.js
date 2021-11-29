const { Person } = require('../models/person.js')
const { Controller } = require('../lib/controller/index.js')
const { NOT_FOUND_RESPONS, invalidParamsRespons, okRespons } = require('../lib/constants.js')

class UpdatePerson extends Controller {
  static route () {
    return {
      path: '/person/:personId',
      method: Controller.METHOD.put
    }
  }

  controller (body, params) {
    try {
      Person.isUUID(params.personId)
    } catch (e) {
      return invalidParamsRespons(e.message)
    }
    const person = new Person().update(params.personId, body)
    if (!person) {
      return NOT_FOUND_RESPONS
    } else {
      return okRespons(person)
    }
  }
}

module.exports = {
  UpdatePerson
}
