module.exports = {
  create: {
    required: [
      'title',
      'description'
    ],
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      image: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      video: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
      }
    }
  },
  update: {
    properties: {
      title: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      image: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      video: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED']
      }
    }
  },
  properties: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    image: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    video: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
  }
}
