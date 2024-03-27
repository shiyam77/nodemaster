module.exports = {
  create: {
    required: [
      'name',
      'email',
      'mobileNumber'
    ],
    properties: {
      name: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      mobileNumber: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
      }
    }
  },
  update: {
    properties: {
      name: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      mobileNumber: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
      }
    }
  },
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    mobileNumber: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
  }
}
