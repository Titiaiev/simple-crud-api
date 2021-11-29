/* eslint-disable no-undef */
const { randomUUID } = require('crypto')
const request = require('supertest')
const { server } = require('../src/index.js')

// jest.setTimeout(20000)

/** @type {request.SuperAgentTest} */
let agent
beforeAll(() => {
  agent = request.agent(server)
})

afterAll(() => {
  server.close()
})

describe('GET /person', function () {
  it('responds with json', function (done) {
    agent
      .get('/person')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('responds with code 200', function (done) {
    agent
      .get('/person')
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('responds with empty array in body ', function (done) {
    agent
      .get('/person')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          throw err
        } else {
          expect(res.body).toEqual([])
        }
        return done()
      })
  })
})

describe('POST /person', function () {
  it('responds with 201 code and body', function (done) {
    agent
      .post('/person')
      .set('Content-Type', 'application/json')
      .send({ name: 'Max', age: 34, hobbies: [] })
      .expect(201)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toMatchObject({ name: 'Max', age: 34, hobbies: [] })// .toEqual({ name: 'Max', age: 34, hobbies: [] })
        return done()
      })
  })

  it('responds with 400 code', function (done) {
    agent
      .post('/person')
      .set('Content-Type', 'application/json')
      .send({ name: 'Max', age: 34 })
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ message: 'person invalid' })
        return done()
      })
  })
})

describe('GET /person/:personId', function () {
  const ids = []

  beforeAll((done) => {
    for (let i = 0; i < 3; i++) {
      agent
        .post('/person')
        .set('Content-Type', 'application/json')
        .send({ name: 'Max' + i, age: i, hobbies: [] })
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          ids.push(res.body.id)
          // console.log(ids)
          return done()
        })
    }
  })

  it('responds with 200 code', (done) => {
    agent
      .get(`/person/${ids[0]}`)
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toMatchObject({ name: 'Max0', age: 0, hobbies: [] })
        return done()
      })
  })

  it('body should have id property', (done) => {
    agent
      .get(`/person/${ids[0]}`)
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toBeDefined()
        expect(res.body.id).toBeDefined()
        expect(res.body.id).toBe(ids[0])
        return done()
      })
  })

  it('should return 404 code if user not exist', (done) => {
    agent
      .get(`/person/${randomUUID()}`)
      .expect(404)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ msg: 'Not Found' })
        return done()
      })
  })

  it('should return 400 code if invalid id', (done) => {
    agent
      .get('/person/qwwertyu123456')
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ message: 'uuid invalid' })
        return done()
      })
  })
})

describe('PUT /person/{personId}', () => {
// + Сервер возвращает статус код 200 и обновленную запись плюс 10 баллов
// + Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid) плюс 6 баллов
// + Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена плюс 6 баллов
  const user = { name: 'Max', age: 34, hobbies: [] }
  const updatedUser = { name: 'Maxim', age: 34, hobbies: ['some hobbie'] }
  let id = ''

  beforeAll((done) => {
    agent.post('/person')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect(201)
      .end((err, res) => {
        if (err) throw err
        id = res.body.id
        return done()
      })
  })

  it('should responds with code 200 and body', (done) => {
    agent
      .put(`/person/${id}`)
      .set('Content-Type', 'application/json')
      .send(updatedUser)
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ ...updatedUser, id })
        return done()
      })
  })

  it('should responds with code 400', (done) => {
    agent
      .put('/person/werrertr')
      .set('Content-Type', 'application/json')
      .send(updatedUser)
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ message: 'uuid invalid' })
        return done()
      })
  })

  it('should responds with code 404', (done) => {
    agent
      .put(`/person/${randomUUID()}`)
      .set('Content-Type', 'application/json')
      .send(updatedUser)
      .expect(404)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ msg: 'Not Found' })
        return done()
      })
  })
})

describe('DELETE /person/{personId}', () => {
  // Сервер возвращает статус код 204 если запись найдена и удалена плюс 10 баллов
  // Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid) плюс 6 баллов
  // Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена плюс 6 баллов
  const user = { name: 'Max', age: 34, hobbies: [''] }
  let id = ''

  beforeAll((done) => {
    agent.post('/person')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect(201)
      .end((err, res) => {
        if (err) throw err
        id = res.body.id
        return done()
      })
  })

  it('should responds with code 204', (done) => {
    agent
      .delete(`/person/${id}`)
      .expect(204)
      .end((err, res) => {
        if (err) throw err
        // expect(res.body).toMatch('')
        return done()
      })
  })

  it('should responds with code 400', (done) => {
    agent
      .delete('/person/rutyru')
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ message: 'uuid invalid' })
        return done()
      })
  })

  it('should responds with code 404', (done) => {
    agent
      .delete(`/person/${randomUUID()}`)
      .expect(404)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).toEqual({ msg: 'Not Found' })
        return done()
      })
  })
})
