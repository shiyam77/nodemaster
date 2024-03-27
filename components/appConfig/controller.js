const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { SUCCESS, ERROR, MSG, CYCLE1, CYCLE2, CYCLE3, MENU, CUSTOMER_SUPPORT } = require('../../libs/constants')

class Controller extends BaseController {
  constructor () {
    super()
    this.service = new Service()
  }

  async save (req, res) {
    const isExist = await this.service.checkAlreadyExist()
    if (isExist <= 0) {
      const data = await this.service.save(req.body)
      if (!_.isUndefined(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Config created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'Already Exist' })
    }
  }

  async list (req, res) {
    const data = await this.service.list(req)
    if (!_.isUndefined(data) && data.length > 0) {
      this.sendResponse(req, res, SUCCESS.CODE, { data: data })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.no_records_found' })
    }
  }

  async getById (req, res) {
    const { id } = req.params
    const data = await this.service.getById(id)
    if (!_.isUndefined(data) && data.id) {
      this.sendResponse(req, res, SUCCESS.CODE, { data: data })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: MSG.NO_RECORD })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const data = await this.service.update(id, req.body)
    if (!_.isUndefined(data) && data.ok) {
      this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated successfully' })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: MSG.NO_RECORD })
    }
  }

  async checkVersion (req, res) {
    const deviceType = req.body.deviceType ? req.body.deviceType.toLowerCase() : ''
    const data = await this.service.checkVersion()
    if (!_.isUndefined(data) && data._id) {
      const deviceData = data[deviceType]
      delete data.ios
      delete data.android
      _.merge(data, { deviceType }, deviceData, { cycle1: CYCLE1, cycle2: CYCLE2, cycle3: CYCLE3, menus: MENU, customerSupport: CUSTOMER_SUPPORT })
      this.sendResponse(req, res, SUCCESS.CODE, { data: data })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: MSG.NO_RECORD })
    }
  }
}

module.exports = Controller
