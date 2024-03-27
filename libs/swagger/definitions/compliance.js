module.exports = {
  create: {
    required: [
      'image',
      'type',
      'service',
      'validFrom',
      'validTo',
      'renewalCycle',
      'cycle1',
      'cycle2',
      'cycle3'
    ],
    properties: {
      image: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      certificateType: {
        type: String,
        default: ''
      },
      type: {
        type: 'string'
      },
      service: {
        type: 'string'
      },
      validFrom: {
        type: 'string',
        format: 'date'
      },
      validTo: {
        type: 'string',
        format: 'date'
      },
      renewalCycle: {
        type: 'string'
      },
      cycle1: {
        type: 'string'
      },
      cycle2: {
        type: 'string'
      },
      cycle3: {
        type: 'string'
      }
    }
  },
  update: {
    properties: {
      image: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      certificateType: {
        type: String,
        default: ''
      },
      type: {
        type: 'string'
      },
      service: {
        type: 'string'
      },
      validFrom: {
        type: 'string',
        format: 'date'
      },
      validTo: {
        type: 'string',
        format: 'date'
      },
      renewalCycle: {
        type: 'string'
      },
      cycle1: {
        type: 'string'
      },
      cycle2: {
        type: 'string'
      },
      cycle3: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['PENDING', 'APPROVED', 'REJECTED']
      }
    }
  },
  properties: {
    image: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    certificateType: {
      type: String,
      default: ''
    },
    type: {
      type: 'string'
    },
    service: {
      type: 'string'
    },
    validFrom: {
      type: 'string',
      format: 'date'
    },
    validTo: {
      type: 'string',
      format: 'date'
    },
    renewalCycle: {
      type: 'string'
    },
    cycle1: {
      type: 'string'
    },
    cycle2: {
      type: 'string'
    },
    cycle3: {
      type: 'string'
    }
  }
}
