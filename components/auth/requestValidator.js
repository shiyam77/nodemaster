const joi = require('@hapi/joi')

const login = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required()
})

module.exports = {
  login
}
