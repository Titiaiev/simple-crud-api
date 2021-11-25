function getBody (req, contentType = '') {
  return new Promise((resolve, reject) => {
    const body = []
    req.on('data', (chunk) => body.push(chunk))
    req.on('error', (err) => reject(err))
    req.on('end', () => {
      try {
        const str = Buffer.concat(body).toString('utf-8')
        if (contentType.includes('json')) {
          const parsed = JSON.parse(str)
          resolve(parsed)
        } else {
          resolve(str)
        }
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  getBody
}
