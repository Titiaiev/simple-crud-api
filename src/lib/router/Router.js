const { Tree } = require('./Tree.js')

/** @type {Map<Symbol, Tree>} */
const routers = new Map()

const notFoundHandlers = new Map()

class Router {
  constructor () {
    /** @private */
    this.id = Symbol('routerID')
    routers.set(this.id, new Tree())
    Object.freeze(this)
  }

  add (method = '', path = '', controller) {
    const routes = [method, ...splitRoute(path)]
    const success = routers
      .get(this.id)
      .add(routes, controller)
    if (success) return this
    else throw new Error('handler not added')
  }

  call (method, route, ctx) {
    const routes = splitRoute(route)
    const [node, params] = routers
      .get(this.id)
      .search([method, ...routes])
    // console.log([method, ...routes])
    if (node) {
      const CurrentController = node.controller
      const controller = new CurrentController(ctx.req, ctx.res)
      controller.exec(params)
    } else {
      if (notFoundHandlers.get(this.id)) {
        const NF = notFoundHandlers.get(this.id)
        new NF(ctx.req, ctx.res).exec()
      } else ((res) => { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not Found') })(ctx.res)
    }
  }

  setNotFoundHandler (handler) {
    if (handler) {
      notFoundHandlers.set(this.id, handler)
    }
    return this
  }
}

function splitRoute (route = '') {
  return ['/', ...route.split('/').filter(i => i)]
}

module.exports = {
  Router
}
