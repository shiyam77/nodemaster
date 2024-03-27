const Speciality = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createSpeciality (params) {
    const data = new Speciality(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'Speciality-save', message: e.message })
    })
  }

  async getAll () {
    return Speciality.find().sort({ createdAt: -1 }).lean().catch((e) => {
      errLogger.error({ method: 'Speciality-getAll', message: e.message })
    })
  }

  async getById (id) {
    return Speciality.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'Speciality-getById', message: e.message })
    })
  }

  async updateSpeciality (id, updateParams) {
    return Speciality.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Speciality-getById', message: e.message })
    })
  }

  async deleteSpeciality (id, updateParams) {
    return Speciality.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Speciality-getById', message: e.message })
    })
  }
}

const specialityService = new Service()

module.exports = { Service, specialityService }
