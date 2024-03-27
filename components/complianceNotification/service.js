const _ = require('lodash')
const moment = require('moment')
const ComplianceNotification = require('./schema')
const { errLogger } = require('../../config/logger')
const { ROLES } = require('../../libs/constants')

class Service {
  async createComplianceNotification (params) {
    const data = new ComplianceNotification(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-save', message: e.message })
    })
  }

  async createMultipleComplianceNotification (params) {
    return ComplianceNotification.insertMany(params).catch((e) => {
      errLogger.error({ method: 'compliance-notification-save', message: e.message })
    })
  }

  async getAll (req) {
    const reqData = req.query
    const query = ComplianceNotification.find()
    if (!_.includes([ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE], req.user.role)) {
      query.where({ hospitalId: [req.user.hospitalId] })
    }

    if (reqData.type) {
      const type = reqData.type.split(',')
      query.where({ type: { $in: type } })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: [reqData.hospitalId] })
    }

    if (reqData.userId) {
      query.where({ userId: [reqData.userId] })
    }

    if (reqData.isDeleted) {
      query.where({ isDeleted: reqData.isDeleted })
    }

    if (reqData.fromDate && reqData.toDate) {
      const fromDate = moment(reqData.fromDate).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      const toDate = moment(reqData.toDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      query.where({ when: { $gte: new Date(fromDate), $lte: new Date(toDate) } })
    } else if (reqData.fromDate) {
      const fromDate = moment(reqData.fromDate).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      query.where({ when: { $gte: new Date(fromDate) } })
    } else if (reqData.toDate) {
      const toDate = moment(reqData.toDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      query.where({ when: { $lte: new Date(toDate) } })
    }

    query.populate({
      path: 'hospitalId',
      select: 'nabhCertificationName mobileNumber email',
      populate: {
        path: 'speciality',
        select: 'name'
      }
    })

    query.populate({
      path: 'complianceId',
      select: 'validFrom validTo status',
      populate: [{
        path: 'approvedBy',
        select: 'name deviceToken'
      },
      {
        path: 'createdBy',
        select: 'name deviceToken'
      },
      {
        path: 'ownedBy',
        select: 'name deviceToken'
      },
      {
        path: 'type',
        select: 'name duration isComplianceServiceTypeAvailable'
      },
      {
        path: 'service',
        select: 'name duration'
      }]
    })

    query.sort({ createdAt: -1 })

    return query
      .lean().catch((e) => {
        errLogger.error({ method: 'ComplianceNotification-getAll', message: e.message })
      })
  }

  async getAllCount (req) {
    const reqData = req.query
    const query = ComplianceNotification.find()
    if (!_.includes([ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE], req.user.role)) {
      query.where({ hospitalId: [req.user.hospitalId] })
    }

    if (reqData.type) {
      const type = reqData.type.split(',')
      query.where({ type: { $in: type } })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: [reqData.hospitalId] })
    }

    if (reqData.userId) {
      query.where({ userId: [reqData.userId] })
    }

    if (reqData.isDeleted) {
      query.where({ isDeleted: reqData.isDeleted })
    }

    if (reqData.fromDate && reqData.toDate) {
      const fromDate = moment(reqData.fromDate).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      const toDate = moment(reqData.toDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      query.where({ when: { $gte: new Date(fromDate), $lte: new Date(toDate) } })
    } else if (reqData.fromDate) {
      const fromDate = moment(reqData.fromDate).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      query.where({ when: { $gte: new Date(fromDate) } })
    } else if (reqData.toDate) {
      const toDate = moment(reqData.toDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      query.where({ when: { $lte: new Date(toDate) } })
    }

    return query.countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-getAllCount', message: e.message })
    })
  }

  async getById (id) {
    return ComplianceNotification.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-getById', message: e.message })
    })
  }

  async updateComplianceNotification (id, updateParams) {
    return ComplianceNotification.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-update', message: e.message })
    })
  }

  async batchUpdateComplianceNotification (id, updateParams) {
    return ComplianceNotification.updateMany(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-update-batch', message: e.message })
    })
  }

  async deleteComplianceNotification (id, updateParams) {
    return ComplianceNotification.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-delete', message: e.message })
    })
  }

  async deleteComplianceNotificationByFilters (query, updateParams) {
    return ComplianceNotification.updateMany(query, updateParams).catch((e) => {
      errLogger.error({ method: 'ComplianceNotification-deleteByFilters', message: e.message })
    })
  }
}

const complianceComplianceNotificationService = new Service()

module.exports = { Service, complianceComplianceNotificationService }
