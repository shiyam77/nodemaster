const _ = require('lodash')
const moment = require('moment')
const BaseController = require('../base/controller')
const { hospitalService: service } = require('./service')
const { userService: userServ } = require('../user/service')
const { complianceService: complianceServ } = require('../compliance/service')
const { SUCCESS, ERROR, STATUS } = require('../../libs/constants')

class Controller extends BaseController {
  async createHospital (req, res, next) {
    try {
      const data = await service.createHospital(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Hospital created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getHospitals (req, res, next) {
    try {
      const result = await service.getHospitalAndCount(req)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          data: result && result[0].results ? result[0].results : [],
          count:
            result && result[0].totalCount[0] && result[0].totalCount[0].count
              ? result[0].totalCount[0].count
              : 0
        })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getHospitalById (req, res, next) {
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

  async updateHospital (req, res, next) {
    try {
      const { hospitalId } = req.user

      if (req.body && req.body.isFirstLogin === true) {
        req.body.registrationDate = moment().format()
        req.body.status = STATUS.ACTIVE
      }
      // const userCount = await userServ.getAllUserCount(req)
      // if (_.isUndefined(req.body.staffCount)) {
      //   req.body.staffCount = userCount
      // }
      // if (userCount <= req.body.staffCount) {
      const result = await service.updateHospital({ _id: hospitalId }, req.body)
      if (!_.isEmpty(result)) {
        let updateParams = { isFirstLogin: false }
        if (req.body && req.body.status) {
          updateParams = { isFirstLogin: false, status: req.body.status }
        }
        userServ.updateUserbasedOnHospital({ hospitalId: hospitalId }, updateParams)
        const complianceParams = await service.createDefaultCompliance(req)
        if (!_.isEmpty(complianceParams)) {
          complianceServ.createCompliance(complianceParams)
        }
        this.sendResponse(req, res, SUCCESS.CODE, { data: result, message: 'Updated hospital details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
      // } else {
      //   this.sendResponse(req, res, ERROR.CODE, { message: 'Staff count mismatch.' })
      // }
    } catch (e) {
      next(e)
    }
  }

  async updateHospitalPaymentStatus (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateHospital({ _id: id }, { paymentStatus: req.body.paymentStatus })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated hospital details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteHospital (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteHospital({ _id: id }, { status: 'DELETED' })
      if (!_.isEmpty(result)) {
        userServ.updateUserbasedOnHospital({ hospitalId: id }, { status: 'DELETED' })
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted hospital details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
