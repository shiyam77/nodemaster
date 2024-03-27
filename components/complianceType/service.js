const ComplianceType = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createComplianceType (params) {
    const data = new ComplianceType(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'ComplianceType-save', message: e.message })
    })
  }

  async getAll () {
    return ComplianceType.find().sort({ createdAt: -1 }).lean().catch((e) => {
      errLogger.error({ method: 'ComplianceType-getAll', message: e.message })
    })
  }

  async getById (id) {
    return ComplianceType.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'ComplianceType-getById', message: e.message })
    })
  }

  async updateComplianceType (id, updateParams) {
    return ComplianceType.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceType-getById', message: e.message })
    })
  }

  async deleteComplianceType (id, updateParams) {
    return ComplianceType.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceType-getById', message: e.message })
    })
  }
}

const complianceTypeService = new Service()

module.exports = { Service, complianceTypeService }
