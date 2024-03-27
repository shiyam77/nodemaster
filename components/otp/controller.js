const _ = require('lodash')
const moment = require('moment')
const BaseController = require('../base/controller')
const { otpService: service } = require('./service')
const AuthController = require('../auth/controller')
const { userService: userServ } = require('../user/service')
const utils = require('../../helpers/utils')
const axios = require('axios')
const { errLogger } = require('../../config/logger')

const API = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
})

const {
  SUCCESS,
  ERROR,
  STATUS,
  OTP_TYPE
} = require('../../libs/constants')

class Controller extends BaseController {
  async generateOtp (req, res) {
    const isInactiveMobile = await userServ.isValidMobileNumber(req.body)
    if (isInactiveMobile >= 1) {
      const userData = await userServ.getUserDetailByMobileNumber({ mobileNumber: req.body.mobileNumber })
      if (!_.isEmpty(userData) && !_.isEmpty(userData.hospitalId) && userData.hospitalId.paymentStatus === 'UNPAID') {
        this.sendResponse(req, res, ERROR.CODE, { message: 'Your subscription has expired. Please reactivate your account' })
      } else {
        const sendOtp = await this.generateValidOtp(req, res)
        if (sendOtp) {
          this.sendResponse(req, res, SUCCESS.CODE, { message: 'server_success.otp.sent' })
        } else {
          this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.otp.failed' })
        }
      }
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.invalid_mobile_number' })
    }
  }

  async generateValidOtp (req, res) {
    const mobileNumber = req.body.mobileNumber
    const type = req.body.type
    const query = {
      mobileNumber: mobileNumber,
      type: type,
      status: STATUS.UN_VERIFIED
    }
    const optExists = await service.isOtpExist(query)
    if (!_.isUndefined(optExists) && _.isObject(optExists) && optExists.id) {
      if (Controller.checkOtpExpiryTime(optExists)) {
        // send sms code will comes here
        return true
      }
      return this.sendOtp(req, res)
    } else {
      return this.sendOtp(req, res)
    }
  }

  async sendOtp (req, res, rand = null) {
    const mobileNumber = req.body.mobileNumber
    const type = req.body.type
    if (_.isEmpty(rand)) {
      rand = utils.getRandomNumber()
      const otpData = {
        code: rand,
        mobileNumber: mobileNumber,
        type: type,
        status: STATUS.UN_VERIFIED
      }
      const message = `Your OTP for NABH Tracker is ${rand}. Please use this to login.`
      const SMS_URL = `${process.env.SMS_GATEWAY_URL}?ApiKey=${process.env.SMS_API_KEY}&ClientId=${process.env.SMS_CLIENTID}&SenderId=${process.env.SMS_SENDERID}&Message=${message}&MobileNumbers=91${mobileNumber}&Is_Unicode=${process.env.SMS_UNICODE}&Is_Flash=${process.env.SMS_FLASH}`

      await API.get(`${SMS_URL}`).catch((e) => {
        errLogger.error({ method: 'OTP-send-sms-notification', dateTime: moment().format('DD-MM-YYYY HH:mm:ss') })
      })
      const data = await service.save(otpData)

      if (!_.isUndefined(data) && data.id) {
        // send sms code will comes here
        return true
      } else {
        return false
      }
    }
  }

  static checkOtpExpiryTime (otpData) {
    const currentTime = moment().utc()
    const otpCreateTime = moment(otpData.createdAt)
    const duration = moment.duration(currentTime.diff(otpCreateTime))
    const minutes = duration.asMinutes()
    const expireTime = process.env.OTP_EXPIRES
    return minutes < expireTime
  }

  async verifyOtp (req, res) {
    const otpQuery = {
      mobileNumber: req.body.mobileNumber,
      type: req.body.type,
      code: req.body.code,
      status: STATUS.UN_VERIFIED
    }
    const optExists = await service.isOtpExist(otpQuery)
    if (!_.isUndefined(optExists) && !_.isNull(optExists) && optExists.id) {
      if (Controller.checkOtpExpiryTime(optExists)) {
        if (_.includes([OTP_TYPE.LOGIN], req.body.type)) {
          const updateParams = {
            status: STATUS.VERIFIED
          }
          const otpData = await service.updateOtp({ _id: optExists.id }, updateParams)
          if (!_.isUndefined(otpData) && otpData._id) {
            const userData = await userServ.getUserDetailByMobileNumber({ mobileNumber: req.body.mobileNumber, status: { $ne: STATUS.DELETE } })
            if (userData) {
              new AuthController().authenticateSuccessAction(req, res, userData)
            } else {
              this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.user.not.found' })
            }
          } else {
            this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.internal_error' })
          }
        } else {
          this.sendResponse(req, res, SUCCESS.CODE, { message: 'server_success.otp.verified' })
        }
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.otp.expired' })
      }
    } else if (_.isNull(optExists)) {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.otp.invalid' })
    }
  }

  async list (req, res) {

  }
}

module.exports = Controller
