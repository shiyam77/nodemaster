const joi = require('@hapi/joi')

const read = joi.object().keys()

const list = joi.object().keys()

const create = joi.object().keys()

const updatePass = joi.object().keys()

const updateUser = joi.object().keys()

const update = joi.object().keys()

const remove = joi.object().keys()

module.exports = {
  list,
  read,
  create,
  updatePass,
  updateUser,
  update,
  remove
}
