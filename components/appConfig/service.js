const AppConfig = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async save (params) {
    const data = new AppConfig(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'appConfig-save', message: e.message })
    })
  }

  async checkAlreadyExist () {
    return AppConfig.countDocuments().lean().exec().catch((e) => {
      errLogger.error({ method: 'appConfig-checkAlreadyExist', message: e.message })
    })
  }

  async list () {
    return AppConfig.find().lean().catch((e) => {
      errLogger.error({ method: 'appConfig-list', message: e.message })
    })
  }

  async getById (id) {
    return AppConfig.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'appConfig-getById', message: e.message })
    })
  }

  async update (id, updateParams) {
    return AppConfig.updateOne({ _id: id }, updateParams).catch((e) => {
      errLogger.error({ method: 'appConfig-updateOne', message: e.message })
    })
  }

  async checkVersion () {
    return AppConfig.findOne().lean().catch((e) => {
      errLogger.error({ method: 'appConfig-checkVersion', message: e.message })
    })
  }
}

module.exports = Service
