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
    controller.createHospital.bind(controller)
  )

router
  .route('/')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.list)
    ),
    controller.getHospitals.bind(controller)
  )

router
  .route('/')
  .put(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateHospital.bind(controller)
  )

router
  .route('/:id')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getHospitalById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.update)
    ),
    controller.updateHospitalPaymentStatus.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteHospital.bind(controller)
  )

module.exports = router
