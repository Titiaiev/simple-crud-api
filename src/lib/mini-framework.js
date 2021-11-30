const http = require('http')
const { Router } = require('./router/Router.js')

function miniFramework ({ controllers, PORT }) {
  const server = http.createServer(setup(controllers, Router))

  server.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`)
  })

  return server
}

function setup (controllers, Router) {
  const router = new Router()

  for (const c in controllers) {
    const { method, path } = controllers[c].route()
    if (path.trim() === '*') router.setNotFoundHandler(controllers[c])
    else router.add(method, path, controllers[c])
  }

  return (req, res) => {
    router.call(req.method, req.url, { req, res })
  }
}

module.exports = {
  miniFramework
}
