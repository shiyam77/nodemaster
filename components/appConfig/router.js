const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')

const controller = new Controller()
const validator = new Validator()

router
  .route('/')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.save.bind(controller)
  )

router
  .route('/')
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.list.bind(controller)
  )

router
  .route('/:id')
  .get(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getById.bind(controller)
  )

router
  .route('/:id')
  .put(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.update.bind(controller)
  )

router
  .route('/checkVersion')
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.checkVersion)
    ),
    controller.checkVersion.bind(controller)
  )

module.exports = router
