const _ = require('lodash')
const jwt = require('express-jwt')
const gcm = require('node-gcm')
const { ROLES, STATIC_PASSWORD, STATIC_OTP, IS_STATIC_OTP } = require('../libs/constants')
const ClientError = require('../helpers/ClientError')
const sender = new gcm.Sender(process.env.FCM_KEY)
const openApis = [
  '/api/v1/auth/login'
]
const secret = process.env.JWT_SECRET

const auth = jwt({ secret, algorithms: ['HS256'] }).unless({ path: openApis })

const isAdminUser = function (req, res, next) {
  if (req.user && _.includes([ROLES.ADMIN, ROLES.ADMIN_MANAGER, ROLES.EXECUTIVE], req.user.role)) next()
  else next(new ClientError('Access denied', 403))
}

const isValidUser = function (req, res, next) {
  if (req.user) next()
  else next(new ClientError('Access denied', 403))
}

/**
 * Generate OTP (random numbers)
 * @param {number} len default 4, maximum 15
 */
function getRandomNumber (len = 4) {
  if (IS_STATIC_OTP === 'true') {
    return STATIC_OTP
  }

  return Math.random().toString().substr(2, len)
}

/**
 * Generate random characters
 * @param {number} [length] default 9
 * @param {object} [options]
 * @param {boolean} [options.alpha]
 * @param {boolean} [options.small]
 * @param {boolean} [options.caps]
 * @param {boolean} [options.num]
 * @param {string} [options.special]
 */
function generateChars (length = 9, options) {
  const s = 'abcdefghijklmnopqrstuvwxyz'
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const n = '0123456789'

  let chars = ''
  if (!options) {
    chars = c + s + n
  } else {
    if (options.alpha || options.caps) chars += c
    if (options.alpha || options.small) chars += s
    if (options.num) chars += n
    if (options.special) chars += options.special
  }

  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate 9 digit private code (caps and nums)
 */
function generateCode () {
  if (process.env.NODE_ENV === 'development') {
    return STATIC_PASSWORD
  }

  return generateChars(9, { caps: true, num: true })
}

/**
 * Validate the given text against provided policy options
 * @param {string} [text]
 * @param {object} [options] validation policy options
 * @param {boolean} [options.alpha]
 * @param {boolean} [options.small]
 * @param {boolean} [options.caps]
 * @param {boolean} [options.num]
 * @param {boolean} [options.special]
 * @param {number} [options.min]
 * @param {number} [options.max]
 */
function validateChars (text, options = {}) {
  if (!(options.min || options.max)) return false
  const a = '(?=.*[A-Za-z])'
  const c = '(?=.*[A-Z])'
  const s = '(?=.*[a-z])'
  const n = '(?=.*\\d)'
  const sp = '(?=.*[^A-Za-z0-9\\s])'

  let chars = ''
  if (options.alpha) chars += a
  if (options.caps) chars += c
  if (options.small) chars += s
  if (options.num) chars += n
  if (options.special) chars += sp

  const min = options.min || ''
  const max = options.max || ''
  const regex = (new RegExp(`^${chars}.{${min},${max}}$`))
  return regex.test(text)
}

function checkPasswordPolicy (password) {
  return validateChars(password, {
    small: true,
    caps: true,
    num: true,
    special: false,
    min: 8
  })
}

function getCacheKey (module, reqQuery = {}) {
  const limit = Number(reqQuery.limit || process.env.PAGE_LIMIT)
  const page = Number(reqQuery.page || 1)
  return `${module}:${page}:${limit}`
}

function deleteWildCardKeys (redisInstance) {
  redisInstance.RedisClient.prototype.delwild = function (keyWithWildcard, callback) {
    const redis = this

    redis.eval(
      // little fancy atomic lua script based on
      // http://stackoverflow.com/a/16974060/3202588
      "local keysToDelete = redis.call('keys', ARGV[1]) " + // find keys with wildcard
      'if unpack(keysToDelete) ~= nil then ' + // if there are any keys
      "return redis.call('del', unpack(keysToDelete)) " + // delete all
      'else ' +
      'return 0 ' + // if no keys to delete
      'end ',
      0, // no keys names passed, only one argument ARGV[1]
      keyWithWildcard,
      function (error, responce) {
        if (error) {
          callback(error)
          return
        }

        // success
        callback(null, responce)
      }
    )
  }
}

function sendPushNotification (msgText, registrationTokens, res = {}) {
  const message = new gcm.Message({
    data: {
      title: 'Compliance app',
      body: msgText,
      icon: 'ic_launcher_round.png'
    },
    notification: {
      title: 'Compliance app',
      body: msgText,
      icon: 'ic_launcher_round.png'
    }
  })

  // ... trying only once
  sender.sendNoRetry(message, { registrationTokens }, function (err, response) {
    if (err) console.error(err)
    else console.log(response)
    if (Object.getOwnPropertyNames(res).length) {
      res.send({
        success: true,
        message: 'Notification sent',
        data: response
      })
    }
  })
}

module.exports = {
  auth,
  isAdminUser,
  isValidUser,
  getRandomNumber,
  generateCode,
  checkPasswordPolicy,
  getCacheKey,
  deleteWildCardKeys,
  sendPushNotification
}
