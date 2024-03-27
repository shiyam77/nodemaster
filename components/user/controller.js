const _ = require('lodash')
const bcrypt = require('bcrypt')
const moment = require('moment')
const BaseController = require('../base/controller')
const { userService: service } = require('./service')
const { hospitalService: hservice } = require('../hospital/service')
const { checkPasswordPolicy } = require('../../helpers/utils')
const { SUCCESS, ERROR, ROLES } = require('../../libs/constants')
const { errLogger } = require('../../config/logger')

const axios = require('axios')

const API = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
})

class Controller extends BaseController {
  async create (req, res, next) {
    try {
      req.body.hospitalId = req.user.hospitalId
      req.body.isFirstLogin = false
      let permission
      if (req.body.role === ROLES.STAFF) {
        permission = req.body.permission
        delete req.body.permission
      }
      // req.query.hospitalId = req.body.hospitalId
      // const userCount = await service.getAllCount(req)
      // const hospitalData = await hospitalService.getById(req.body.hospitalId)
      // const staffCount = hospitalData.staffCount
      // if (staffCount > userCount) {
      const data = await service.save(req.body)
      console.log(data)
      if (!_.isEmpty(data) && data.id) {
        if (!_.isEmpty(permission)) {
          const params = []
          for (const labelKey in permission) {
            const value = permission[labelKey]
            for (const perm in value) {
              params.push({ user: data.id, type: perm, service: value[perm] })
            }
          }
          await service.savePermission(params)
          await service.saveComplainceUser(req.user.hospitalId, params)
        }
        const mobileNumber = data.mobileNumber
        const message = `Hi, your Account with NABH Tracker is created. Please download the App ${process.env.APP_LINK} and login with your Mobile No.`
        const SMS_URL = `${process.env.SMS_GATEWAY_URL}?ApiKey=${process.env.SMS_API_KEY}&ClientId=${process.env.SMS_CLIENTID}&SenderId=${process.env.SMS_SENDERID}&Message=${message}&MobileNumbers=91${mobileNumber}&Is_Unicode=${process.env.SMS_UNICODE}&Is_Flash=${process.env.SMS_FLASH}`

        await API.get(`${SMS_URL}`).catch((e) => {
          errLogger.error({ method: 'create-user-sms-notification', dateTime: moment().format('DD-MM-YYYY HH:mm:ss') })
        })
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'User created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
      // } else {
      //   this.sendResponse(req, res, ERROR.CODE, { message: 'User count exists' })
      // }
    } catch (e) {
      next(e)
    }
  }

  async createUsers (req, res, next) {
    try {
      if (_.includes([ROLES.STAFF, ROLES.CO_ORDINATOR], req.body.role)) {
        req.body.isFirstLogin = false
      }
      const data = await service.createUsers(req.body)
      if (!_.isEmpty(data) && data.id) {
        const mobileNumber = data.mobileNumber
        const message = `Hi, your Account with NABH Tracker is created. Please download the App ${process.env.APP_LINK} and login with your Mobile No.`
        const SMS_URL = `${process.env.SMS_GATEWAY_URL}?ApiKey=${process.env.SMS_API_KEY}&ClientId=${process.env.SMS_CLIENTID}&SenderId=${process.env.SMS_SENDERID}&Message=${message}&MobileNumbers=91${mobileNumber}&Is_Unicode=${process.env.SMS_UNICODE}&Is_Flash=${process.env.SMS_FLASH}`

        await API.get(`${SMS_URL}`).catch((e) => {
          errLogger.error({ method: 'create-user-sms-notification', dateTime: moment().format('DD-MM-YYYY HH:mm:ss') })
        })
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'User created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateUsers (req, res, next) {
    try {
      const { id } = req.params
      // req.query.hospitalId = id
      // const userCount = await service.getAllUserCount(req)
      // if (_.isUndefined(req.body.staffCount)) {
      //   req.body.staffCount = userCount
      // }
      // if (userCount <= req.body.staffCount) {
      if (req.body && req.body.password) {
        if (!checkPasswordPolicy(req.body.password)) {
          this.sendResponse(req, res, ERROR.CODE, { message: 'Weak password' })
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }

      const data = await service.updateUsers(id, req.body)
      if (!_.isEmpty(data) && data.ok === 1) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
      // } else {
      //   this.sendResponse(req, res, ERROR.CODE, { message: 'Staff count mismatch' })
      // }
    } catch (e) {
      next(e)
    }
  }

  async getUsers (req, res, next) {
    try {
      const result = await service.getAll(req)
      if (!_.isEmpty(result)) {
        const count = await service.getAllCount(req)
        this.sendResponse(req, res, SUCCESS.CODE, { data: result, count: count })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async createAdminUsers (req, res, next) {
    const { name, email, mobileNumber, role, password, avatar } = req.body
    try {
      if (!checkPasswordPolicy(password)) {
        this.sendResponse(req, res, ERROR.CODE, { message: 'Weak password' })
      }
      const hash = await bcrypt.hash(password, 10)
      const data = await service.save({
        avatar,
        name,
        email,
        mobileNumber,
        role,
        password: hash
      })
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'User created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateProfile (req, res, next) {
    try {
      const { id } = req.user
      const result = await service.updateUser({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        await hservice.updateHospital({ _id: req.user.hospitalId }, { nameOfHospitalHead: req.body.name })
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Profile updated successfullydsd' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getProfile (req, res, next) {
    try {
      const { id } = req.user
      const result = await service.getById(id)
      req.query.hospitalId = result.hospitalId._id
      const userCount = await service.getAllUserCount(req)
      result.userCount = userCount
      if (!_.isEmpty(result)) {
        if (result.role === 'MANAGER') {
          result.name = result.hospitalId.nameOfHospitalHead
        }
        this.sendResponse(req, res, SUCCESS.CODE, { data: result })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getUserById (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.getById(id)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { data: result })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateUserById (req, res, next) {
    try {
      const { id } = req.params
      let permission
      if (req.body.role === ROLES.STAFF) {
        permission = req.body.permission
        delete req.body.permission
      }
      if (req.body && req.body.password) {
        if (!checkPasswordPolicy(req.body.password)) {
          this.sendResponse(req, res, ERROR.CODE, { message: 'Weak password' })
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }

      if (_.isEmpty(req.body.password)) {
        delete req.body.password
      }
      const result = await service.updateUser({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        if (!_.isEmpty(permission)) {
          const params = []
          for (const labelKey in permission) {
            const value = permission[labelKey]
            for (const perm in value) {
              params.push({ user: id, type: perm, service: value[perm] })
            }
          }
          await service.removeComplianceUser(req.user.hospitalId, id)
          await service.updatePermission(id, params)
          await service.saveComplainceUser(req.user.hospitalId, params)
        }
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated user details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteUser (req, res, next) {
    try {
      const { id } = req.params
      const user = await service.getById(id)
      const result = await service.deleteUser({ _id: id }, { status: 'DELETED' })
      if (!_.isEmpty(result)) {
        const mobileNumber = user.mobileNumber
        const message = `Hi ${user.name}, your Account with NABH Tracker is deactivated. Please contact the ACME Support Team`
        const SMS_URL = `${process.env.SMS_GATEWAY_URL}?ApiKey=${process.env.SMS_API_KEY}&ClientId=${process.env.SMS_CLIENTID}&SenderId=${process.env.SMS_SENDERID}&Message=${message}&MobileNumbers=91${mobileNumber}&Is_Unicode=${process.env.SMS_UNICODE}&Is_Flash=${process.env.SMS_FLASH}`

        await API.get(`${SMS_URL}`).catch((e) => {
          errLogger.error({ method: 'delete-user-sms-notification', dateTime: moment().format('DD-MM-YYYY HH:mm:ss') })
        })

        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async uniqueMobileValidation (req, res) {
    const result = await service.isMobileNumberAlreadyExist(req.body.mobileNumber, req.body.id ? req.body.id : '')
    if (!_.isUndefined(result) && result > 0) {
      this.sendResponse(req, res, ERROR.CODE, { message: 'Already Exist' })
    } else {
      this.sendResponse(req, res, SUCCESS.CODE, { message: 'No Mobile No. found' })
    }
  }
}

module.exports = Controller
