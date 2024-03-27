module.exports = {
  create: {
    required: [
      'name',
      'stateId'
    ],
    properties: {
      name: {
        type: 'string'
      },
      stateId: {
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
      stateId: {
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
    stateId: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
  }
}
