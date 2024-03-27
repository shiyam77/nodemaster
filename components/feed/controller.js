const _ = require('lodash')
const BaseController = require('../base/controller')
const { feedService: service } = require('./service')
const { SUCCESS, ERROR } = require('../../libs/constants')

class Controller extends BaseController {
  async createFeed (req, res, next) {
    try {
      const data = await service.createFeed(req.body)
      if (!_.isEmpty(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Feed created successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getFeeds (req, res, next) {
    try {
      const feeds = await service.getFeedsAndCount(req)
      if (!_.isEmpty(feeds)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          data: feeds && feeds[0].results ? feeds[0].results : [],
          count: feeds && feeds[0].totalCount[0] && feeds[0].totalCount[0].count
            ? feeds[0].totalCount[0].count
            : 0
        })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async getFeedById (req, res, next) {
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

  async updateFeed (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.updateFeed({ _id: id }, req.body)
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Updated feed details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }

  async deleteFeed (req, res, next) {
    try {
      const { id } = req.params
      const result = await service.deleteFeed({ _id: id }, { status: 'DELETED' })
      if (!_.isEmpty(result)) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted feed details successfully' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'No records found' })
      }
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
