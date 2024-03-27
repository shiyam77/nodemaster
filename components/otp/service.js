const Otp = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async save (params) {
    const data = new Otp(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'otp-save', message: e.message })
    })
  }

  async isOtpExist (query) {
    return Otp.findOne(query, {}, { sort: { createdAt: -1 } }).catch((e) => {
      errLogger.error({ method: 'otp-isOtpExist', message: e.message })
    })
  }

  async updateOtp (query, updateParams) {
    return Otp.findByIdAndUpdate(query, updateParams).catch((e) => {
      errLogger.error({ method: 'otp-update', message: e.message })
    })
  }
}

const otpService = new Service()

module.exports = { Service, otpService }
