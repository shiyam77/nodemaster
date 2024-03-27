const authentication = require('./authentication')
const user = require('./user')
const hospital = require('./hospital')
const compliance = require('./compliance')
const complianceType = require('./complianceType')
const complianceServiceType = require('./complianceServiceType')
const feed = require('./feed')
const speciality = require('./speciality')
const area = require('./area')
const city = require('./city')
const state = require('./state')
const notification = require('./notification')
const otp = require('./otp')
const appConfig = require('./appConfig')
const interest = require('./interest')
const headers = require('./header')
const response = require('./response')

module.exports = {
  Auth: authentication,
  User: user,
  Feed: feed,
  Hospital: hospital,
  Compliance: compliance,
  ComplianceType: complianceType,
  ComplianceServiceType: complianceServiceType,
  Speciality: speciality,
  State: state,
  City: city,
  Area: area,
  Notification: notification,
  Otp: otp,
  AppConfig: appConfig,
  Interest: interest,
  Headers: headers,
  Request: response,
  Response: response
}
