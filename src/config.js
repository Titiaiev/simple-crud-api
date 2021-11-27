const de = require('dotenv').config({ debug: process.env.DEBUG })
if (de.error) {
  process.stdout.write('Config fail')
  process.stdout.write(de.error)
  process.exit(1)
}

/** @type {"dev"|"prod"} */
const MODE = process.env.NODE_ENV
const PORT = (MODE === 'dev') ? process.env.DEV_PORT || 3000 : process.env.PORT || 3000

module.exports = {
  MODE,
  PORT: Number.parseInt(PORT, 10)
}
