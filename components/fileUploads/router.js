const express = require('express')
const router = express.Router()
const Controller = require('./controller')
const Validator = require('../base/Validator')
const requestValidator = require('./requestValidator')
const { auth, isValidUser } = require('../../helpers/utils')

const controller = new Controller()
const validator = new Validator()

router
  .route('/')
  .post(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.upload)
    ),
    controller.putObject.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteObject.bind(controller)
  )

module.exports = router
