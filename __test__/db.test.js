/* eslint-disable no-undef */
const { db } = require('../src/db')

describe('db.collection("users")', () => {
  let users = null

  beforeEach(() => {
    users = db.colection('users')
    users.insert({ name: 'Max', age: 30 })
    users.insert({ name: 'Alex', age: 25 })
    users.insert({ name: 'Lida', age: 20 })
    users.insert({ name: 'Anna', age: 37 })
  })

  afterEach(() => {
    users.deleteAll()
  })

  it('getAll() length should be 4', () => {
    expect(users.getAll()).toHaveLength(4)
  })

  it('getById() should return user', () => {
    const max = users.insert({ name: 'Max', age: 30 })
    expect(users.getById(max.id).name).toBe('Max')
  })

  it('updateById() should update user', () => {
    const max = users.insert({ name: 'Max', age: 30 })
    expect(users.updateById(max.id, { name: 'maxim' })).toEqual({ name: 'maxim', age: 30, id: max.id })
  })

  it('deleteById() should delete user', () => {
    const max = users.insert({ name: 'Max', age: 30 })
    expect(users.deleteById(max.id)).toBe(true)
  })

  it('deleteAll() should delete all', () => {
    expect(users.getAll()).toHaveLength(4)
    users.deleteAll()
    expect(users.getAll()).toHaveLength(0)
  })
})
