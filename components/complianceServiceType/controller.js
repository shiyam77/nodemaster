const _ = require('lodash')
const BaseController = require('../base/controller')
const { complianceServiceTypeService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends BaseController {
  async createComplianceServiceType (req, res, next) {
    try {
      const data = await service.createComplianceServiceType(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'ComplianceServiceType created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getComplianceServiceType (req, res, next) {
    try {
      const { id } = req.user
      const result = await service.getAll(id)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { data: result })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getComplianceServiceTypeById (req, res, next) {
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

  async updateComplianceServiceType (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateComplianceServiceType({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted compliance service type details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteComplianceServiceType (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteComplianceServiceType({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated compliance service type details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
