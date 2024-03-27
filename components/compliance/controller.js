const _ = require('lodash')
const moment = require('moment')
const BaseController = require('../base/controller')
const { complianceService: service } = require('./service')
const { complianceComplianceNotificationService } = require('../complianceNotification/service')
const { userService: userServ } = require('../user/service')
const ComplianceNotificationRequest = require('./complianceNotificationRequest')
const { SUCCESS, ERROR, ROLES, COMPLIANCE_STATUS } = require('../../libs/constants')

class Controller extends BaseController {
  async createCompliance (req, res, next) {
    try {
      if (_.includes([ROLES.OWNER, ROLES.MANAGER, ROLES.CO_ORDINATOR, ROLES.STAFF], req.user.role)) {
        req.body.status = COMPLIANCE_STATUS.APPROVED
        req.body.approvedBy = req.user.id
        req.body.approvedAt = moment().format()
      } else if (_.includes([ROLES.STAFF], req.user.role)) {
        req.body.status = COMPLIANCE_STATUS.PENDING
      }
      if (req.body.cycle1 && req.body.validTo) {
        var cycle1 = (req.body.cycle1).split('_')
        req.body.cycle1ValidTo = moment(req.body.validTo, 'YYYY-MM-DD').subtract(cycle1[0], cycle1[1]).format('YYYY-MM-DD')
      }
      if (req.body.cycle2 && req.body.validTo) {
        var cycle2 = (req.body.cycle2).split('_')
        req.body.cycle2ValidTo = moment(req.body.validTo, 'YYYY-MM-DD').subtract(cycle2[0], cycle2[1]).format('YYYY-MM-DD')
      }
      if (req.body.cycle3 && req.body.validTo) {
        var cycle3 = (req.body.cycle3).split('_')
        req.body.cycle3ValidTo = moment(req.body.validTo, 'YYYY-MM-DD').subtract(cycle3[0], cycle3[1]).format('YYYY-MM-DD')
      }
      req.body.createdBy = req.user.id
      req.body.hospitalId = req.user.hospitalId
      const data = await service.createCompliance(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Compliance created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getCompliance (req, res, next) {
    try {
      const result = await service.getAll(req)
      if (!_.isEmpty(result)) {
        if (req.user.role === ROLES.STAFF) {
          const permission = await userServ.getById(req.user.id)
          result.map((data) => {
            permission.permission.map((perm) => {
              const permType = perm.type.toString()
              const type = data.type._id.toString()
              const permService = perm.service.toString()
              const service = data.service._id.toString()
              if (permType === type && _.includes(permService, service)) {
                return result
              }
            })
          })
        }
        this.sendResponse(req, res, SUCCESS.CODE, { data: result, count: result.length })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getComplianceByStatus (req, res, next) {
    try {
      const result = await service.getAllByStatus(req)
      if (!_.isEmpty(result)) {
        if (req.user.role === ROLES.STAFF) {
          const permission = await userServ.getById(req.user.id)
          result.map((data) => {
            permission.permission.map((perm) => {
              const permType = perm.type.toString()
              const type = data.type._id.toString()
              const permService = perm.service.toString()
              const service = data.service._id.toString()
              if (permType === type && _.includes(permService, service)) {
                return result
              }
            })
          })
        }
        this.sendResponse(req, res, SUCCESS.CODE, { data: result, count: result.length })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getComplianceById (req, res, next) {
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

  async updateCompliance (req, res, next) {
    try {
      const { id } = req.params
      const previousData = await service.getById(id)
      if (!_.isEmpty(previousData)) {
        if (_.includes([ROLES.OWNER, ROLES.MANAGER, ROLES.CO_ORDINATOR], req.user.role)) {
          req.body.status = COMPLIANCE_STATUS.APPROVED
          req.body.approvedBy = req.user.id
          req.body.approvedAt = moment().format()
          if (previousData.status === 'NEW') {
            req.body.createdBy = req.user.id
          }
        } else if (_.includes([ROLES.STAFF], req.user.role)) {
          req.body.createdBy = req.user.id
          req.body.status = COMPLIANCE_STATUS.APPROVED
        }
        if (req.body.validTo && (moment(req.body.validTo, 'YYYY-MM-DD')).diff(moment()) < 0) {
          req.body.status = COMPLIANCE_STATUS.EXPIRED
        }
        if (req.body.cycle1 && req.body.validTo) {
          var cycle1 = (req.body.cycle1).split('_')
          req.body.cycle1ValidTo = moment(req.body.validTo, 'YYYY-MM-DD').subtract(cycle1[0], cycle1[1]).format('YYYY-MM-DD')
        }
        if (req.body.cycle2 && req.body.validTo) {
          var cycle2 = (req.body.cycle2).split('_')
          req.body.cycle2ValidTo = moment(req.body.validTo, 'YYYY-MM-DD').subtract(cycle2[0], cycle2[1]).format('YYYY-MM-DD')
        }
        if (req.body.cycle3 && req.body.validTo) {
          var cycle3 = (req.body.cycle3).split('_')
          req.body.cycle3ValidTo = moment(req.body.validTo, 'YYYY-MM-DD').subtract(cycle3[0], cycle3[1]).format('YYYY-MM-DD')
        }
        const result = await service.updateCompliance({ _id: id, hospitalId: req.user.hospitalId }, req.body)
        if (!_.isEmpty(result)) {
          const newData = await service.getById(id)
          this.createComplianceNotification(req.body, newData)
          this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated compliance successfully' })
        } else {
          this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
        }
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async updateComplianceExpiry (req, res, next) {
    try {
      const { id } = req.params
      const previousData = await service.getById(id)
      if (!_.isEmpty(previousData)) {
        service.updateCompliance({ _id: id }, { status: COMPLIANCE_STATUS.EXPIRED })
        this.sendResponse(req, res, SUCCESS.CODE, { message: `Compliance(${id}) updated successfully` })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async batchUpdateComplianceExpiry (req, res, next) {
    try {
      service.batchUpdateCompliance({ _id: { $in: req.body.ids } }, { status: COMPLIANCE_STATUS.EXPIRED })
      this.sendResponse(req, res, SUCCESS.CODE, { message: `Compliance(${req.body.ids.toString()}) updated successfully` })
    } catch (e) {
      next(e)
    }
  }

  async createComplianceNotification (params, result) {
    await complianceComplianceNotificationService.deleteComplianceNotificationByFilters(
      { complianceId: result._id, hospitalId: result.hospitalId._id, isDeleted: false },
      { isDeleted: true }
    )
    const createParams = new ComplianceNotificationRequest().build(params, result)
    complianceComplianceNotificationService.createMultipleComplianceNotification(createParams)
  }

  async deleteCompliance (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteCompliance({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted compliance successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
