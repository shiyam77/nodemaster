const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { SUCCESS, ERROR, ROLES } = require('../../libs/constants')

class Controller extends BaseController {
  constructor () {
    super()
    this.service = new Service()
    this.userCanCreateUpdate = [ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.MANAGER, ROLES.EXECUTIVE]
  }

  async dashBoardStat (req, res) {
    const data = await this.service.dashBoardStat(req)
    if (!_.isUndefined(data) && !_.isEmpty(data)) {
      this.sendResponse(req, res, SUCCESS.CODE, { data })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.no_records_found' })
    }
  }
}

module.exports = Controller
