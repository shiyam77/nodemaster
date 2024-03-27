const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')
const { auth, isAdminUser, isValidUser } = require('../../helpers/utils')

const controller = new Controller()
const validator = new Validator()

router
  .route('/')
  .post(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createNotification.bind(controller)
  )

router
  .route('/')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getNotification.bind(controller)
  )

router
  .route('/batch')
  .post(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.batch)
    ),
    controller.batchNotification.bind(controller)
  )

router
  .route('/manual-notification')
  .post(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createManualNotification.bind(controller)
  )

router
  .route('/mark-read')
  .put(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.markRead.bind(controller)
  )

router
  .route('/:id')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getNotificationById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateNotification.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteNotification.bind(controller)
  )

module.exports = router
