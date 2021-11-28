const { Person } = require('../models/person.js')
const { Controller } = require('../lib/controller/index.js')

class GetPerson extends Controller {
  static route () {
    return {
      path: '/person/:personId',
      method: Controller.METHOD.get
    }
  }

  controller (body, params) {
    try {
      Person.isUUID(params.personId)
    } catch (e) {
      return { code: 400, res: e.message }
    }
    const person = new Person().get(params.personId)
    if (!person) {
      return {
        code: 404,
        res: ''
      }
    } else {
      return {
        code: 200,
        res: person
      }
    }
  }
}

module.exports = {
  GetPerson
}
