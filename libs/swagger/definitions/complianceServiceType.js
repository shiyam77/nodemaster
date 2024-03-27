module.exports = {
  create: {
    required: [
      'complianceType',
      'name',
      'duration'
    ],
    properties: {
      complianceType: {
        type: 'string'
      },
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
      complianceType: {
        type: 'string'
      },
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
    complianceType: {
      type: 'string'
    },
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
