module.exports = {
  manualNotification: {
    required: [
      'type',
      'dataType',
      'data',
      'userType',
      'message'
    ],
    properties: {
      message: {
        type: 'string'
      },
      type: {
        type: 'string',
        enum: ['NABH', 'NOTIFICATIONS']
      },
      dataType: {
        type: 'string',
        enum: ['ALL_HOSPITAL', 'STATE', 'CITY', 'AREA']
      },
      userType: {
        type: 'string',
        enum: ['ALL_USERS', 'MANAGER']
      },
      data: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  },
  create: {
    required: [
      'description'
    ],
    properties: {
      title: {
        type: 'string',
        trim: true
      },
      description: {
        type: 'string',
        trim: true
      },
      userId: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      state: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      city: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      area: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      hospitalId: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      response: {
        type: 'object'
      },
      userType: {
        type: 'string',
        enum: ['ALL_USERS', 'MANAGER']
      },
      type: {
        type: 'string',
        enum: ['NABH', 'NOTIFICATIONS']
      },
      category: {
        type: 'string',
        enum: ['MANUAL_NOTIFICATION', 'COMPLIANCE_NOTIFICATION']
      },
      isSent: {
        type: 'boolean'
      }
    }
  },
  update: {
    properties: {
      title: {
        type: 'string',
        trim: true
      },
      description: {
        type: 'string',
        trim: true
      },
      userId: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      state: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      city: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      area: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      hospitalId: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      response: {
        type: 'object'
      },
      userType: {
        type: 'string',
        enum: ['ALL_USERS', 'MANAGER']
      },
      type: {
        type: 'string',
        enum: ['NABH', 'NOTIFICATIONS']
      },
      category: {
        type: 'string',
        enum: ['MANUAL_NOTIFICATION', 'COMPLIANCE_NOTIFICATION']
      },
      isSent: {
        type: 'boolean'
      }
    }
  },
  properties: {
    title: {
      type: 'string',
      trim: true
    },
    description: {
      type: 'string',
      trim: true
    },
    userId: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    state: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    city: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    area: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    hospitalId: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    response: {
      type: 'object'
    },
    userType: {
      type: 'string',
      enum: ['ALL_USERS', 'MANAGER']
    },
    type: {
      type: 'string',
      enum: ['NABH', 'NOTIFICATIONS']
    },
    category: {
      type: 'string',
      enum: ['MANUAL_NOTIFICATION', 'COMPLIANCE_NOTIFICATION']
    },
    isSent: {
      type: 'boolean'
    }
  }
}
