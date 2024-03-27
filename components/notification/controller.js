const _ = require('lodash')
const BaseController = require('../base/controller')
const { notificationService: service } = require('./service')
const { hospitalService: hospitalServ } = require('../hospital/service')
const { userService: userServ } = require('../user/service')
const { SUCCESS, ERROR } = require('../../libs/constants')
const utils = require('../../helpers/utils')

class Controller extends BaseController {
  async createNotification (req, res, next) {
    try {
      const data = await service.createNotification(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Notification created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async batchNotification (req, res, next) {
    try {
      const data = await service.batchNotification(req.body)
      if (!_.isEmpty(data)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Batch Notification created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async createManualNotification (req, res, next) {
    try {
      const query = {}
      const params = req.body
      const dataType = params.dataType.toLowerCase()
      if (params.dataType !== 'ALL_HOSPITAL') {
        query[`${dataType}`] = params.data
      }

      query.userType = params.userType
      const hospitalDetails = await hospitalServ.getHospitalIds(query)
      const hospitalIds = hospitalDetails.map(a => a._id)

      let userDetails = await userServ.getUserDetailsByHospitalIds(query, hospitalIds)

      userDetails = _.chunk(userDetails, 1000)

      userDetails.forEach(function (users) {
        users.forEach(user => {
          const createParams = {
            description: params.message,
            userId: user._id,
            state: dataType === 'state' ? params.data : [],
            city: dataType === 'city' ? params.data : [],
            area: dataType === 'area' ? params.data : [],
            hospitalId: user.hospitalId,
            userType: params.userType,
            dataType: params.dataType,
            type: params.type,
            category: 'MANUAL_NOTIFICATION',
            isSent: true
          }
          service.createNotification(createParams)
        })
      })

      userDetails.forEach(function (arrayItem) {
        let tokens = arrayItem.map(a => a.deviceToken)
        tokens = _.compact(tokens)
        if (!_.isEmpty(tokens)) {
          utils.sendPushNotification(params.message, tokens)
        }
      })

      this.sendResponse(req, res, SUCCESS.CODE, { message: 'Notification created successfully' })
    } catch (e) {
      next(e)
    }
  }

  async getNotification (req, res, next) {
    try {
      const result = await service.getAll(req)
      if (!_.isEmpty(result)) {
        const count = await service.getAllCount(req)
        const unReadCount = await service.getUnReadCount(req)
        this.sendResponse(req, res, SUCCESS.CODE, { data: result, count: count, unRead: unReadCount })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getNotificationById (req, res, next) {
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

  async updateNotification (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateNotification({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated notification details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async markRead (req, res, next) {
    try {
      const result = await service.markRead({ userId: req.user.id }, { isRead: true })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated notification details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteNotification (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteNotification({ _id: id }, req.body)
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
