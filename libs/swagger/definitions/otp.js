module.exports = {
  generateOtp: {
    required: ['mobileNumber', 'type'],
    properties: {
      mobileNumber: {
        type: 'string'
      },
      type: {
        type: 'string',
        enum: ['LOGIN']
      }
    }
  },
  verifyOtp: {
    required: ['mobileNumber', 'type', 'code'],
    properties: {
      mobileNumber: {
        type: 'string'
      },
      type: {
        type: 'string',
        enum: ['LOGIN']
      },
      code: {
        type: 'string'
      }
    }
  },
  properties: {
    mobileNumber: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: ['LOGIN']
    },
    code: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['UN_VERIFIED', 'VERIFIED', 'EXPIRED']
    }
  }
}
