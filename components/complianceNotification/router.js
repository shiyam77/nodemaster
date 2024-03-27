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
    controller.createComplianceNotification.bind(controller)
  )

router
  .route('/')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getComplianceNotification.bind(controller)
  )

router
  .route('/sendnotification')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getSendComplianceNotification.bind(controller)
  )

router
  .route('/batch')
  .put(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.batchUpdateComplianceNotification.bind(controller)
  )

router
  .route('/:id')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getComplianceNotificationById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateComplianceNotification.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteComplianceNotification.bind(controller)
  )

module.exports = router
