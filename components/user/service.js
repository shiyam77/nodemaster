const _ = require('lodash')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./schema')
const Compliance = require('../compliance/schema')
const Hospital = require('../hospital/schema')
const PermissionSchema = require('./permissionSchema')
const { errLogger } = require('../../config/logger')
const ClientError = require('../../helpers/ClientError')
const { STATUS, ROLES } = require('../../libs/constants')

class Service {
  async save (params) {
    const data = new User(params)
    return data.save().catch((e) => {
      console.log(e)
      errLogger.error({ method: 'users-save', message: e.message })
      throw new ClientError('Unable to create user')
    })
  }

  async savePermission (params) {
    return PermissionSchema.insertMany(params).catch((e) => {
      errLogger.error({ method: 'users-save', message: e.message })
    })
  }

  async removeComplianceUser (hospitalId, userId) {
    await Compliance.updateMany({ hospitalId: hospitalId }, { $pullAll: { assignedTo: [userId] } }, { multi: true })
    return true
  }

  async saveComplainceUser (hospitalId, params) {
    params.forEach(async function (param) {
      const complianceObj = await Compliance.findOne({ hospitalId: hospitalId, service: param.service, type: param.type }).lean()
      const complianceId = complianceObj._id
      let assignedTo = {}
      if (_.isUndefined(complianceObj.assignedTo)) {
        assignedTo = { assignedTo: [param.user] }
      } else {
        assignedTo = { $push: { assignedTo: param.user } }
      }
      await Compliance.updateOne({ _id: complianceId }, assignedTo).catch((e) => {
        errLogger.error({ method: 'users-save-compliance', message: e.message })
      })
    })
    return true
  }

  async createUsers (params) {
    const isAlreadyExist = await this.isMobileNumberAlreadyExist(params.user.mobileNumber)

    if (isAlreadyExist <= 0) {
      const data = new Hospital(params.hospital)
      const hospital = await data.save().catch((e) => {
        errLogger.error({ method: 'users-save', message: e.message })
      })
      if (hospital) {
        params.user.hospitalId = hospital._id
        params.user.role = params.user.role ? params.user.role : 'MANAGER'
        const data = new User(params.user)
        return data.save().catch((e) => {
          errLogger.error({ method: 'users-save', message: e.message })
        })
      } else {
        throw new ClientError('Unable to create hospital')
      }
    } else {
      throw new ClientError('Mobile number already exist')
    }
  }

  async updateUsers (id, params) {
    const { hospital } = params
    const hospitalData = await Hospital.updateOne({ _id: id }, params.hospital).catch((e) => {
      errLogger.error({ method: 'users-save', message: e.message })
    })
    if (hospitalData) {
      const updateParams = {}
      updateParams.status = hospital.status === STATUS.SUSPENDED ? STATUS.INACTIVE : STATUS.ACTIVE
      const userStatus = hospital.status === STATUS.SUSPENDED ? STATUS.ACTIVE : STATUS.INACTIVE
      const updateUser = await User.updateMany({ hospitalId: id, status: userStatus }, updateParams).catch((e) => {
        errLogger.error({ method: 'User-updateById', message: e.message })
      })
      return updateUser
    } else {
      throw new ClientError('Unable to update hospital')
    }
  }

  async isValidMobileNumber (query) {
    return User.where({ mobileNumber: query.mobileNumber, status: { $eq: STATUS.ACTIVE } }).countDocuments().catch((e) => {
      errLogger.error({ method: 'users-isMobileNoInactiveOrDeleted', message: e.message })
    })
  }

  async authenticate (query) {
    return User.findOne(query).lean().catch((e) => {
      errLogger.error({ method: 'admin-authenticate', message: e.message })
    })
  }

  async verifyAdminUser (query) {
    const user = await User.findOne({ email: query.email, role: { $in: [ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE] } }).select('email name mobileNumber role status password').lean()

    // no such user
    if (!user) throw new ClientError('Invalid user')

    // user not (or yet to) active
    if (user.status !== STATUS.ACTIVE) { throw new ClientError('User is not active') }
    console.log('query.password', query.password)
    // password mismatch
    const result = await bcrypt.compare(query.password, user.password)
    if (!result) throw new ClientError('Invalid password')

    return user
  }

  async getAll (req) {
    const reqData = req.query
    const query = User.find()
    if (req.user.role !== ROLES.ADMIN) {
      query.where({ hospitalId: req.user.hospitalId })
    }
    if (req.user.role === ROLES.ADMIN || req.user.role === ROLES.ADMIN_MANAGER || req.user.role === ROLES.EXECUTIVE) {
      query.where({ role: { $in: [ROLES.EXECUTIVE, ROLES.ADMIN_MANAGER] } })
    }
    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, 'i') })
    }

    if (reqData.email) {
      query.where({ email: new RegExp(reqData.email, 'i') })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: reqData.hospitalId })
    }

    if (reqData.status) {
      query.where({ status: reqData.status })
    } else {
      query.where({ status: STATUS.ACTIVE })
    }

    if (req.user.role === ROLES.STAFF) {
      query.where({ role: ROLES.STAFF })
    } else if (reqData.role) {
      query.where({ role: reqData.role })
    }

    query.sort({ createdAt: -1 })

    return query
      .populate({
        path: 'permission',
        select: 'type service _id'
      })
      .lean().catch((e) => {
        errLogger.error({ method: 'User-getAll', message: e.message })
      })
  }

  async getAllCount (req) {
    const reqData = req.query
    console.log(reqData)
    const query = User.find()
    if (req.user.role !== ROLES.ADMIN || req.user.role === ROLES.ADMIN_MANAGER) {
      query.where({ hospitalId: req.user.hospitalId })
    }
    if (req.user.role === ROLES.ADMIN || req.user.role === ROLES.ADMIN_MANAGER || req.user.role === ROLES.EXECUTIVE) {
      query.where({ role: { $in: [ROLES.EXECUTIVE, ROLES.ADMIN_MANAGER] } })
    }
    if (reqData.name) {
      query.where({ name: new RegExp(reqData.name, 'i') })
    }

    if (reqData.email) {
      query.where({ email: new RegExp(reqData.email, 'i') })
    }

    if (reqData.hospitalId) {
      query.where({ hospitalId: new mongoose.Types.ObjectId(reqData.hospitalId) })
    }

    if (reqData.status) {
      query.where({ status: reqData.status })
    } else {
      query.where({ status: STATUS.ACTIVE })
    }

    if (req.user.role === ROLES.STAFF) {
      query.where({ role: ROLES.STAFF })
    } else if (reqData.role) {
      query.where({ role: reqData.role })
    }

    query.sort({ createdAt: -1 })
    return query.countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'User-getAllCount', message: e.message })
    })
  }

  async getAllUserCount (req) {
    const reqData = req.query
    const query = User.find()
    if (reqData.hospitalId) {
      query.where({ hospitalId: new mongoose.Types.ObjectId(reqData.hospitalId) })
    }

    if (reqData.status) {
      query.where({ status: reqData.status })
    } else {
      query.where({ status: STATUS.ACTIVE })
    }

    query.sort({ createdAt: -1 })
    return query.countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'User-getAllCount', message: e.message })
    })
  }

  async getById (id) {
    return User.findById(id)
      .populate({
        path: 'permission',
        select: 'type service _id'
      })
      .populate({
        path: 'hospitalId',
        select: '_id nabhCertificationName mobileNumber email staffCount typeOfNABH nameOfHospitalHead',
        populate: {
          path: 'speciality',
          select: 'name'
        }
      })
      .lean().catch((e) => {
        errLogger.error({ method: 'User-getById', message: e.message })
      })
  }

  async updateUser (id, updateParams) {
    return User.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'User-getById', message: e.message })
    })
  }

  async updateUserbasedOnHospital (hospital, updateParams) {
    return User.updateMany(hospital, updateParams).catch((e) => {
      errLogger.error({ method: 'User-getById', message: e.message })
    })
  }

  async deleteUser (id, updateParams) {
    return User.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'User-getById', message: e.message })
    })
  }

  async getUserDetailByMobileNumber (query) {
    return User.findOne(query)
      .populate({
        path: 'hospitalId',
        select: 'mobileNumber email status paymentStatus'
      })
      .lean().catch((e) => {
        errLogger.error({ method: 'users-getUserDetailByMobileNumber', message: e.message })
      })
  }

  async updatePermission (userId, params) {
    const result = await PermissionSchema.deleteMany({ user: userId }).catch((e) => {
      errLogger.error({ method: 'updatePermission-delete', message: e.message })
    })
    if (result) {
      return PermissionSchema.insertMany(params).catch((e) => {
        errLogger.error({ method: 'updatePermission-save', message: e.message })
      })
    }
    return false
  }

  async isMobileNumberAlreadyExist (mobileNumber, id = '') {
    const query = User.where({ mobileNumber: mobileNumber, status: { $ne: STATUS.DELETE } })
    if (id) {
      query.where({ _id: { $ne: id } })
    }

    return query.countDocuments().catch((e) => {
      errLogger.error({ method: 'users-isMobileNumberAlreadyExist', message: e.message })
    })
  }

  async getUserDetailsByHospitalIds (query, hospitalIds) {
    const userQuery = User.find()
    userQuery.where({ status: STATUS.ACTIVE })
    userQuery.where({ hospitalId: { $in: hospitalIds } })
    if (query.userType === ROLES.MANAGER) {
      userQuery.where({ role: ROLES.MANAGER })
    }

    return userQuery.select('_id hospitalId deviceType deviceToken').lean().catch((e) => {
      errLogger.error({ method: 'getHospitalIds', message: e.message })
    })
  }
}

const userService = new Service()

module.exports = { Service, userService }
