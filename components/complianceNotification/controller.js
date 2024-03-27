const _ = require('lodash')
const BaseController = require('../base/controller')
const { complianceComplianceNotificationService: service } = require('./service')
const { userService: userServ } = require('../user/service')
const { SUCCESS, ERROR, ROLES } = require('../../libs/constants')

class Controller extends BaseController {
  async createComplianceNotification (req, res, next) {
    try {
      const data = await service.createComplianceNotification(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'ComplianceNotification created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getComplianceNotification (req, res, next) {
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

  async getSendComplianceNotification (req, res, next) {
    try {
      var results = await service.getAll(req)
      var fullNotification = []
      if (!_.isEmpty(results)) {
        const count = await service.getAllCount(req)
        for (const arrayItem of results) {
          var hospitalId = arrayItem.hospitalId._id
          var userQuery = { user: req.user, query: { hospitalId: hospitalId, role: ROLES.CO_ORDINATOR } }
          var userDetails = await userServ.getAll(userQuery)
          arrayItem.coordinator = userDetails
          fullNotification.push(arrayItem)
        }
        this.sendResponse(req, res, SUCCESS.CODE, { data: fullNotification, count: count })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getComplianceNotificationById (req, res, next) {
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

  async updateComplianceNotification (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateComplianceNotification({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated notification details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
      next(e)
    }
  }

  async batchUpdateComplianceNotification (req, res, next) {
    try {
      const result = await service.batchUpdateComplianceNotification({ _id: { $in: req.body.ids } }, { isDeleted: true })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated notification details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteComplianceNotification (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteComplianceNotification({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted notification details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
