const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { SUCCESS, ERROR, ROLES } = require('../../libs/constants')
const BaseController = require('../base/controller')
const { userService: service } = require('../user/service')

class Controller extends BaseController {
  static generateToken (payload) {
    if (typeof payload !== 'object' || payload.constructor !== Object) {
      throw new Error('Payload should be of type object')
    }
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES_IN
    return jwt.sign(payload, secret, { expiresIn })
  }

  static getPayload (data) {
    const { hospitalId, _id, email, role, mobileNumber } = data
    return {
      id: _id,
      mobileNumber: mobileNumber,
      email: email || '',
      role,
      hospitalId: hospitalId ? hospitalId._id : ''
    }
  }

  async authenticateSuccessAction (req, res, resData) {
    const { hospitalId } = resData
    if (_.includes([ROLES.STAFF, ROLES.CO_ORDINATOR, ROLES.MANAGER], resData.role) && !_.isEmpty(hospitalId) && hospitalId.paymentStatus === 'UNPAID') {
      this.sendResponse(req, res, ERROR.CODE, { message: 'Your subscription has expired. Please reactivate your account' })
    } else {
      const payload = Controller.getPayload(resData)
      const token = Controller.generateToken(payload)
      if (!_.isEmpty(token)) {
        this.sendResponse(req, res, SUCCESS.CODE, {
          data: {
            token,
            isFirstLogin: resData.isFirstLogin,
            email: resData.email,
            name: resData.name,
            mobileNumber: resData.mobileNumber,
            role: resData.role
          },
          message: 'Login success'
        })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.invalid_token' })
      }
    }
  }

  async verifyAdminUser (req, res, next) {
    try {
      const user = await service.verifyAdminUser(req.body)
      if (!_.isEmpty(user) && user._id) {
        this.authenticateSuccessAction(req, res, user)
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'Invalid user details' })
      }
    } catch (e) {
      next(e)
    }
  }

  async guestLogin (req, res, next) {
    try {
      const guestData = {
        isFirstLogin: false,
        email: '',
        name: 'Guest User',
        mobileNumber: '',
        role: 'GUEST'
      }
      this.authenticateSuccessAction(req, res, guestData)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = Controller
