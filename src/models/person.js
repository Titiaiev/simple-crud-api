const { db } = require('../lib/db/index.js')
const persons = db.colection('persons')

class Person {
  add (data) {
    Person.isValidPerson(data)
    return persons.insert(data)
  }

  update (id, data) {
    Person.isUUID(id)
    Person.isValidPerson(data)
    return persons.updateById(id, data)
  }

  get (id) {
    Person.isUUID(id)
    return persons.getById(id)
  }

  getAll () {
    return persons.getAll()
  }

  delete (id) {
    Person.isUUID(id)
    return persons.deleteById(id)
  }

  deleteAll (id) {
    Person.isUUID(id)
    return persons.deleteAll()
  }

  static isValidPerson (p) {
    console.log(p)
    if (
      (typeof p !== 'object') ||
      (p.name === undefined) || (typeof p.name !== 'string') ||
      (p.age === undefined) || (typeof p.age !== 'number') ||
      (p.hobbies === undefined) || !(p.hobbies instanceof Array)
    ) { throw new Error('person invalid') }
  }

  static isUUID (id = '') {
    // 09251da5-334c-4b8a-86a1-051ddc1e8b32
    const isuuid = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/
    if (!isuuid.test(id)) throw new Error('uuid invalid')
  }
}

module.exports = {
  Person
}
