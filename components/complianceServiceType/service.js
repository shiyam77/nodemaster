const ComplianceServiceType = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createComplianceServiceType (params) {
    const data = new ComplianceServiceType(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'ComplianceServiceType-save', message: e.message })
    })
  }

  async getAll () {
    return ComplianceServiceType.find().sort({ createdAt: -1 }).lean().catch((e) => {
      errLogger.error({ method: 'ComplianceServiceType-getAll', message: e.message })
    })
  }

  async getById (id) {
    return ComplianceServiceType.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'ComplianceServiceType-getById', message: e.message })
    })
  }

  async updateComplianceServiceType (id, updateParams) {
    return ComplianceServiceType.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceServiceType-getById', message: e.message })
    })
  }

  async deleteComplianceServiceType (id, updateParams) {
    return ComplianceServiceType.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceServiceType-getById', message: e.message })
    })
  }
}

const complianceServiceTypeService = new Service()

module.exports = { Service, complianceServiceTypeService }
