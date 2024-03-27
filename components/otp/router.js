const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')

const controller = new Controller()
const validator = new Validator()

router
  .route('/')
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.generateOtp)
    ),
    controller.list.bind(controller)
  )

router
  .route('/generate')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.generateOtp)
    ),
    controller.generateOtp.bind(controller)
  )

router
  .route('/verify')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.verifyOtp)
    ),
    controller.verifyOtp.bind(controller)
  )

module.exports = router
