const { Person } = require('../models/person.js')
const { Controller } = require('../lib/controller/index.js')

class GetAllPersons extends Controller {
  static route () {
    return {
      path: '/person',
      method: Controller.METHOD.get
    }
  }

  controller (body, params) {
    const persons = new Person().getAll()

    return {
      code: 200,
      res: persons
    }
  }
}

module.exports = {
  GetAllPersons
}
