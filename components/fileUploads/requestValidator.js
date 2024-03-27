const joi = require('@hapi/joi')

const upload = joi.object().keys()

const remove = joi.object().keys()

module.exports = {
  upload,
  remove
}
