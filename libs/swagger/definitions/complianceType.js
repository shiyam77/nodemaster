module.exports = {
  create: {
    required: [
      'name',
      'duration'
    ],
    properties: {
      name: {
        type: 'string'
      },
      duration: {
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
      duration: {
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
    duration: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
  }
}
