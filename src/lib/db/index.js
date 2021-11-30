const { randomUUID } = require('crypto')

class Collection {
  constructor (name = 'test') {
    this.name = name
    this.docs = new Map()
  }

  insert (obj) {
    const id = randomUUID()
    obj.id = id
    this.docs.set(id, obj)
    return this.getById(id)
  }

  getById (id) {
    if (this.docs.has(id)) return this.docs.get(id)
    return null
  }

  getAll () {
    return [...this.docs.values()]
  }

  deleteAll () {
    this.docs.clear()
  }

  deleteById (id) {
    return this.docs.delete(id)
  }

  updateById (id, newObj) {
    const doc = this.getById(id)
    if (doc) {
      this.docs.set(id, {
        ...doc,
        ...newObj
      })

      return this.getById(id)
    }
  }
}

class DB {
  constructor () {
    /** @private */
    this._colections = {}
  }

  /**
   *
   * @param {String} name
   * @returns {Collection}
   */
  colection (name = '') {
    if (!this._colections[name]) this._colections[name] = new Collection(name)
    return this._colections[name]
  }
}

module.exports = {
  db: new DB()
}
