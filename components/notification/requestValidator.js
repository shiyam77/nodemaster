const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

const create = joi.object().keys()

const batch = joi.array()

const update = joi.object().keys()

const remove = joi.object().keys()

module.exports = {
  list,
  read,
  create,
  update,
  remove,
  batch
}
