const appConst = require('../../constants')

module.exports = {
  200: {
    description: appConst.MSG.HAS_RECORD,
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string'
        },
        message: {
          type: 'string'
        },
        data: {
          type: 'object'
        }
      }
    }
  },
  201: {
    description: appConst.MSG.CREATE,
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string'
        },
        message: {
          type: 'string'
        },
        data: {
          type: 'object'
        }
      }
    }
  },
  properties: {
    status: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    data: {
      type: 'object'
    }
  }
}
