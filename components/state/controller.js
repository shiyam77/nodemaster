const _ = require('lodash')
const BaseController = require('../base/controller')
const { stateService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends BaseController {
  async createState (req, res, next) {
    try {
      const data = await service.createState(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'State created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getStates (req, res, next) {
    try {
      const states = await service.getStateAndCount(req)
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

  async getStateById (req, res, next) {
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

  async updateState (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateState({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated state details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteState (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteState({ _id: id }, { status: 'DELETED' })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted state details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
