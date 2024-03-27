class ClientError extends Error {
  constructor (message, statusCode = 400) {
    super(message)
    this.name = 'ClientError'
    this.code = message.code
    this.statusCode = statusCode
  }
}

module.exports = ClientError
