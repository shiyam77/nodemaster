const Compliance = require('./schema')
const { errLogger } = require('../../config/logger')
const { ROLES, COMPLIANCE_STATUS } = require('../../libs/constants')

class Service {
  async createCompliance (params) {
    return Compliance.insertMany(params).catch((e) => {
      errLogger.error({ method: 'Compliance-save-batch', message: e.message })
    })
  }

  async getAll (req) {
    const reqData = req.query
    const query = Compliance.find()
    if (req.user.role !== ROLES.ADMIN) {
      query.where({ hospitalId: req.user.hospitalId })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: reqData.hospitalId })
    }

    if (reqData.status) {
      query.where({ status: reqData.status })
    }

    return query
      .populate({ path: 'type', select: '_id name status duration' })
      .populate({ path: 'service', select: '_id name status duration' })
      .populate({ path: 'createdBy', select: '_id name mobileNumber email role' })
      .populate({ path: 'approvedBy', select: '_id name mobileNumber email role' })
      .populate({ path: 'rejectedBy', select: '_id name mobileNumber email role' })
      .populate({ path: 'hospitalId', select: '_id name status paymentStatus nameOfHospitalHead' })
      .populate([{ path: 'assignedTo', select: '_id name mobileNumber email role' }])
      .sort({ createdAt: -1 }).lean().catch((e) => {
        errLogger.error({ method: 'Compliance-getAll', message: e.message })
      })
  }

  async getAllByStatus (req) {
    const reqData = req.query
    console.log(reqData)
    const query = Compliance.find()
    if (req.user.role !== ROLES.ADMIN) {
      query.where({ hospitalId: req.user.hospitalId })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: reqData.hospitalId })
    }

    if (reqData.status) {
      query.where({ status: reqData.status })
    }

    if (reqData.statusType) {
      if (reqData.statusType === 'due') {
        query.where({ status: COMPLIANCE_STATUS.APPROVED, cycle1ValidTo: { $lte: new Date() }, validTo: { $gte: new Date() } })
      } else if (reqData.statusType === 'expired') {
        query.where({ status: COMPLIANCE_STATUS.EXPIRED })
      } else {
        query.where({ status: COMPLIANCE_STATUS.APPROVED, cycle1ValidTo: { $gt: new Date() } })
      }
    }

    return query
      .populate({ path: 'type', select: '_id name status duration' })
      .populate({ path: 'service', select: '_id name status duration' })
      .populate({ path: 'createdBy', select: '_id name mobileNumber email role' })
      .populate({ path: 'approvedBy', select: '_id name mobileNumber email role' })
      .populate({ path: 'rejectedBy', select: '_id name mobileNumber email role' })
      .populate({ path: 'hospitalId', select: '_id name status paymentStatus nameOfHospitalHead' })
      .sort({ createdAt: -1 }).lean().catch((e) => {
        errLogger.error({ method: 'Compliance-getAll', message: e.message })
      })
  }

  async getById (id) {
    return Compliance.findById(id)
      .populate({ path: 'type', select: '_id name status duration' })
      .populate({ path: 'service', select: '_id name status duration' })
      .populate({ path: 'createdBy', select: '_id name mobileNumber email role deviceToken' })
      .populate({ path: 'approvedBy', select: '_id name mobileNumber email role deviceToken' })
      .populate({ path: 'rejectedBy', select: '_id name mobileNumber email role deviceToken' })
      .populate({ path: 'hospitalId', select: '_id name status paymentStatus' })
      .lean().catch((e) => {
        errLogger.error({ method: 'Compliance-getById', message: e.message })
      })
  }

  async updateCompliance (id, updateParams) {
    return Compliance.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Compliance-getById', message: e.message })
    })
  }

  async batchUpdateCompliance (id, updateParams) {
    return Compliance.updateMany(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Compliance-getById', message: e.message })
    })
  }

  async deleteCompliance (id, updateParams) {
    return Compliance.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Compliance-getById', message: e.message })
    })
  }
}

const complianceService = new Service()

module.exports = { Service, complianceService }
