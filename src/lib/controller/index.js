const { getBody } = require('../utils/body-parser.js')
class Controller {
  /**
   *
   * @param {import('http').IncomingMessage} req
   * @param {import('http').ServerResponse} res
   */
  constructor (req, res) {
    this.req = req
    this.res = res
  }

  /**
   * @abstract
   * @param {*} body
   * @param {*} params
   * @returns {{code: Number, res: {}}}
   */
  controller (body, params) {
    throw new Error('must be implemented by subclass!')
  }

  serverErrorReply (e) {
    this.res.writeHead(500, { 'Content-Type': 'application/json' })

    if (process.env.NODE_ENV === 'dev') {
      this.res.write(e.message)
      this.res.end(e.stack)
    } else {
      this.res.end(e.message)
    }
  }

  reply (code, data) {
    this.res.writeHead(code, { 'Content-Type': 'application/json' })
    if (data) {
      this.res.end(JSON.stringify(data))
    } else this.res.end('')
  }

  async exec (params) {
    try {
      const body = await getBody(this.req, this.req.headers['content-type'])
      const { code, res } = this.controller(body, params)
      this.reply(code, res)
    } catch (e) {
      this.serverErrorReply(e)
    }
  }
}

Controller.METHOD = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

module.exports = {
  Controller
}
