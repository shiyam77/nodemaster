const _ = require('lodash')
const BaseController = require('../base/controller')
const { stateService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends BaseController {
  async createInterest (req, res, next) {
    try {
      const isExist = await service.isMobileNumberAlreadyExist(req.body.mobileNumber)
      if (isExist <= 0) {
        const data = await service.createInterest(req.body)
        if (!_.isEmpty(data) && data.id) {
          this.sendResponse(req, res, SUCCESS.CODE, { message: 'Interest created successfully' })
        } else {
          this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
        }
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'Mobile number already exist. Compliance team will contact you' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getInterests (req, res, next) {
    try {
      const states = await service.getInterestAndCount(req)
      if (!_.isEmpty(states)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          data: states && states[0].results ? states[0].results : [],
          count: states && states[0].totalCount[0] && states[0].totalCount[0].count
            ? states[0].totalCount[0].count
            : 0
        })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getInterestById (req, res, next) {
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

  async updateInterest (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateInterest({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated state details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteInterest (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteInterest({ _id: id }, { status: 'DELETED' })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted state details successfully' })
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
