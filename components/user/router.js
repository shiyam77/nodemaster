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
    controller.create.bind(controller)
  )

router
  .route('/')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.getUsers.bind(controller)
  )

router
  .route('/admin-user')
  .post(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createAdminUsers.bind(controller)
  )

router
  .route('/admin-user')
  .get(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.getUsers.bind(controller)
  )

router
  .route('/admin')
  .post(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.createUsers.bind(controller)
  )

router
  .route('/admin')
  .get(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.getUsers.bind(controller)
  )

router
  .route('/admin/:id')
  .put(
    auth,
    isAdminUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.create)
    ),
    controller.updateUsers.bind(controller)
  )

router
  .route('/profile')
  .get(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.read)
    ),
    controller.getProfile.bind(controller)
  )

router
  .route('/profile')
  .put(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.updateUser)
    ),
    controller.updateProfile.bind(controller)
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
    controller.getUserById.bind(controller)
  )

router
  .route('/:id')
  .put(
    auth,
    isValidUser,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.updateUser)
    ),
    controller.updateUserById.bind(controller)
  )

router
  .route('/:id')
  .delete(
    auth,
    validator.validateRequest.bind(
      new Validator().init(requestValidator.remove)
    ),
    controller.deleteUser.bind(controller)
  )

module.exports = router
