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
    controller.createInterest.bind(controller)
  )

router
  .route('/')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getInterests.bind(controller)
  )

router
  .route('/unique-mobile')
  .post(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.updateUser)
    ),
    controller.uniqueMobileValidation.bind(controller)
  )

router
  .route('/:id')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getInterestById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateInterest.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteInterest.bind(controller)
  )

module.exports = router
