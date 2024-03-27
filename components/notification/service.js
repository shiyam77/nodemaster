const _ = require('lodash')
const mongoose = require('mongoose')
const Notification = require('./schema')
const { errLogger } = require('../../config/logger')
const { ROLES } = require('../../libs/constants')

class Service {
  async createNotification (params) {
    const data = new Notification(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'Notification-save', message: e.message })
    })
  }

  async batchNotification (params) {
    return Notification.insertMany(params).catch((e) => {
      errLogger.error({ method: 'Notification-save-batch', message: e.message })
    })
  }

  async getAll (req) {
    const reqData = req.query
    const pageNo = reqData.page ? reqData.page : 1
    const limit = reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    const skip = (pageNo - 1) * limit
    const query = Notification.find()

    if (!_.includes([ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE], req.user.role)) {
      query.where({ hospitalId: new mongoose.Types.ObjectId(req.user.hospitalId) })
      query.where({ userId: new mongoose.Types.ObjectId(req.user.id) })
    }

    if (reqData.type) {
      query.where({ type: reqData.type })
    }

    if (reqData.dataType) {
      query.where({ type: reqData.dataType })
    }

    if (reqData.userType) {
      query.where({ userType: reqData.userType })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: new mongoose.Types.ObjectId(reqData.hospitalId) })
    }

    if (reqData.userId) {
      query.where({ userId: new mongoose.Types.ObjectId(req.user.id) })
    }
    query.populate({ path: 'userId', select: '_id name mobileNumber email' })
    query.populate({ path: 'hospitalId', select: '_id name status nabhCertificationName nameOfHospitalHead' })
    query.populate({ path: 'states', select: '_id name' })
    query.populate({ path: 'cities', select: '_id name' })
    query.populate({ path: 'areas', select: '_id name' })
    if (_.includes([ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE], req.user.role)) {
      query.limit(Number(limit))
      query.skip(skip)
    }
    query.sort({ createdAt: -1 })

    return query
      .lean().catch((e) => {
        errLogger.error({ method: 'Notification-getAll', message: e.message })
      })
  }

  async getAllCount (req) {
    const reqData = req.query
    const query = Notification.find()
    if (!_.includes([ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE], req.user.role)) {
      query.where({ hospitalId: new mongoose.Types.ObjectId(reqData.hospitalId) })
    }

    if (reqData.type) {
      query.where({ type: reqData.type })
    }

    if (reqData.dataType) {
      query.where({ type: reqData.dataType })
    }

    if (reqData.userType) {
      query.where({ userType: reqData.userType })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: new mongoose.Types.ObjectId(reqData.hospitalId) })
    }

    if (reqData.userId) {
      query.where({ userId: new mongoose.Types.ObjectId(reqData.userId) })
    }

    return query.countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'Notification-getAllCount', message: e.message })
    })
  }

  getUnReadCount (req) {
    return Notification.find({ userId: new mongoose.Types.ObjectId(req.user.id), isRead: false }).countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'Notification-getAllCount', message: e.message })
    })
  }

  async getById (id) {
    return Notification.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'Notification-getById', message: e.message })
    })
  }

  async updateNotification (id, updateParams) {
    return Notification.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Notification-getById', message: e.message })
    })
  }

  async markRead (query, updateParams) {
    return Notification.updateMany(query, updateParams).catch((e) => {
      errLogger.error({ method: 'Notification-getById', message: e.message })
    })
  }

  async deleteNotification (id, updateParams) {
    return Notification.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Notification-getById', message: e.message })
    })
  }
}

const notificationService = new Service()

module.exports = { Service, notificationService }
