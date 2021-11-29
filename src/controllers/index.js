const { AddPerson } = require('./AddPerson.js')
const { GetAllPersons } = require('./GetAllPersons.js')
const { GetPerson } = require('./GetPerson.js')
const { NotFound } = require('./NotFound.js')
const { UpdatePerson } = require('./UpdatePerson.js')
const { DeletePerson } = require('./DeletePerson.js')

module.exports = {
  AddPerson,
  GetAllPersons,
  GetPerson,
  UpdatePerson,
  DeletePerson,
  NotFound
}
