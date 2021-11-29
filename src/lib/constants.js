const NOT_FOUND_RESPONS = {
  code: 404,
  res: { msg: 'Not Found' }
}

const invalidParamsRespons = (errMsg) => ({ code: 400, res: { message: errMsg } })

const okRespons = (body) => ({ code: 200, res: body })

const createdRespons = (body) => ({ code: 201, res: body })

module.exports = {
  NOT_FOUND_RESPONS,
  invalidParamsRespons,
  okRespons,
  createdRespons
}
