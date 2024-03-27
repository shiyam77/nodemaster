const appConst = require('../../constants')

module.exports = {
  400: {
    description: appConst.MSG.BAD_REQUEST,
    schema: {}
  },
  401: {
    description: appConst.MSG.UNAUTHORIZED,
    schema: {}
  },
  404: {
    description: appConst.MSG.NO_RECORD,
    schema: {}
  },
  500: {
    description: appConst.MSG.TRY_AGAIN,
    schema: {}
  }
}
