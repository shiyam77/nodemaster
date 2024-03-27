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
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createCompliance.bind(controller)
  )

router
  .route('/')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getCompliance.bind(controller)
  )

router
  .route('/getByStatus')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getComplianceByStatus.bind(controller)
  )

router
  .route('/update-expiry')
  .put(
    controller.batchUpdateComplianceExpiry.bind(controller)
  )

router
  .route('/update-expiry/:id')
  .put(
    controller.updateComplianceExpiry.bind(controller)
  )

router
  .route('/:id')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getComplianceById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateCompliance.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteCompliance.bind(controller)
  )

module.exports = router
