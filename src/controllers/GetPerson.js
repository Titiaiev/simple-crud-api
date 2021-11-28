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
    let person = new Person().get(params.personId)
    if (!person) person = {}
    return {
      code: 200,
      res: person
    }
  }
}

module.exports = {
  GetPerson
}
