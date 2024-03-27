const _ = require('lodash')
const fs = require('fs')
const { ERROR, SUCCESS } = require('../../libs/constants')
const BaseController = require('../base/controller')
const { uploads } = require('../../config/uploads')

class Controller extends BaseController {
  static fileSuccessAction (files) {
    const result = []
    _.forEach(files, file => {
      result.push({
        originalname: file.originalname,
        filename: file.filename,
        path: file.path.replace('uploads/', ''),
        size: file.size
      })
    })
    return result
  }

  async putObject (req, res) {
    uploads(req, res, err => {
      let result
      if (req.files && req.files.length) {
        result = Controller.fileSuccessAction(req.files)
      }
      if (err) {
        this.sendResponse(req, res, ERROR.CODE, {
          message: err.message
        })
      } else {
        this.sendResponse(req, res, SUCCESS.CODE, { data: result })
      }
    })
  }

  async deleteObject (req, res) {
    const { id } = req.params
    const type = req.query.type.toLowerCase()
    const hospitalId = req.user.hospitalId
    const userId = req.user.id
    let prefix = `${type}`
    if (type === 'profile') {
      prefix = `${type}/${hospitalId}/${userId}`
    } else if (type === 'compliance') {
      prefix = `${type}/${hospitalId}/compliance`
    }
    const path = `uploads/${prefix}/${id}`

    if (path && fs.existsSync(path)) {
      fs.unlinkSync(path)
      this.sendResponse(req, res, SUCCESS.CODE, { message: 'Deleted successfully' })
    } else {
      this.sendResponse(req, res, ERROR.CODE, {
        message: 'server_error.file_not_found'
      })
    }
  }
}

module.exports = Controller
