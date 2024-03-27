const joi = require('@hapi/joi')

const generateOtp = joi.object().keys({
  mobileNumber: joi.string().required(),
  type: joi.string().valid('LOGIN', 'SIGN_UP').required()
})

const verifyOtp = joi.object().keys({
  mobileNumber: joi.string().required(),
  type: joi.string().valid('LOGIN', 'SIGN_UP').required(),
  code: joi.string().min(4).max(4).required()
})

const list = joi.object().keys()

module.exports = {
  generateOtp,
  verifyOtp,
  list
}
