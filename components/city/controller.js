const _ = require('lodash')
const BaseController = require('../base/controller')
const { cityService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends BaseController {
  async createCity (req, res, next) {
    try {
      const data = await service.createCity(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'City created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getCities (req, res, next) {
    try {
      const cities = await service.getCityAndCount(req)
      if (!_.isEmpty(cities)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          data: cities && cities[0].results ? cities[0].results : [],
          count: cities && cities[0].totalCount[0] && cities[0].totalCount[0].count
            ? cities[0].totalCount[0].count
            : 0
        })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getCityById (req, res, next) {
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

  async updateCity (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateCity({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated city details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteCity (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteCity({ _id: id }, { status: 'DELETED' })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted city details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
