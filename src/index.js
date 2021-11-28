const http = require('http')
const { PORT } = require('./config.js')
const controllers = require('./controllers/index.js')
const { Router } = require('./lib/router/Router.js')
// new Router().setNotFoundHandler()
function oneMoreFramework (controllers, Router) {
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

const server = http.createServer(oneMoreFramework(controllers, Router))

server.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`)
})
