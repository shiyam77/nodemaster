const _ = require('lodash')
const moment = require('moment')
const appConst = require('../../libs/constants')
const { errLogger } = require('../../config/logger')

const currentTime = moment().format('DD-MM-YYYY HH:mm:ss')
const { ERROR, SUCCESS } = appConst

class Controller {
  constructor () {
    this.response = {}
  }

  static responseFormat () {
    return {
      status: '',
      message: '',
      data: {}
    }
  }

  static formatLogs (req, res) {
    let id
    let role
    let reqIp

    if (_.has(req, 'user')) {
      id = req.user.id ? req.user.id : ''
      role = req.user.role ? req.user.role : ''
    }

    if (_.has(req, 'headers') && _.has(req.headers, 'x-client-ip')) {
      reqIp = req.headers['x-client-ip']
    } else {
      reqIp = req.ip ? req.ip : ''
    }

    return {
      reqTime: currentTime,
      reqUrl: req.url ? req.url : '',
      reqMethod: req.method ? req.method : '',
      reqIp,
      reqParams: req.params ? req.params : '',
      reqBody: req.body ? req.body : '',
      reqQuery: req.query ? req.query : '',
      reqUserId: id,
      reqUserRole: role,
      response: res
    }
  }

  static errorResponse (req, error) {
    const response = Controller.responseFormat()
    response.status = ERROR.MSG

    if (_.has(error, 'data')) {
      response.data = error.data
    } else {
      delete response.data
    }

    if (_.has(error, 'message')) {
      response.message = error.message
    }

    const logData = Controller.formatLogs(req, response)
    errLogger.error(logData)

    return response
  }

  static successResponse (success) {
    const response = Controller.responseFormat()
    response.status = SUCCESS.MSG
    if (_.has(success, 'data')) {
      response.data = success.data
    } else {
      delete response.data
    }
    if (_.has(success, 'count')) {
      response.count = success.count
    } else {
      delete response.count
    }
    if (_.has(success, 'unRead')) {
      response.unRead = success.unRead
    } else {
      delete response.unRead
    }
    if (_.has(success, 'message')) {
      response.message = success.message
    } else {
      delete response.message
    }
    return response
  }

  sendResponse (req, res, type, resToSend) {
    this.response = {}
    if (type === ERROR.CODE) {
      this.response = Controller.errorResponse(req, resToSend)
    } else {
      this.response = Controller.successResponse(resToSend)
    }
    return res.json(this.response)
  }
}

module.exports = Controller
