module.exports = {
  byAdmin: {
    required: [
      'hospital',
      'user'
    ],
    properties: {
      hospital: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          state: {
            type: 'string'
          },
          city: {
            type: 'string'
          },
          area: {
            type: 'string'
          },
          address: {
            type: 'string'
          },
          status: {
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          }
        }
      },
      user: {
        type: 'object',
        properties: {
          mobileNumber: {
            type: 'string'
          },
          email: {
            type: 'string'
          }
        }
      }
    }
  },
  uniqueMobile: {
    required: [
      'mobileNumber'
    ],
    properties: {
      mobileNumber: {
        type: 'string'
      },
      id: {
        type: 'string'
      }
    }
  },
  create: {
    required: [
      'name',
      'designation',
      'mobileNumber',
      'email'
    ],
    properties: {
      name: {
        type: 'string'
      },
      designation: {
        type: String
      },
      mobileNumber: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'OWNER', 'ADMIN_MANAGER', 'EXECUTIVE', 'MANAGER', 'CO_ORDINATOR', 'STAFF']
      },
      deviceType: {
        type: 'string',
        enum: ['IOS', 'ANDROID']
      },
      deviceToken: {
        type: 'string'
      },
      notificationStatus: {
        type: 'string'
      },
      createdBy: {
        type: 'string'
      },
      isFirstLogin: {
        type: 'boolean'
      },
      avatar: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'DELETED', 'NEW']
      }
    }
  },
  update: {
    properties: {
      name: {
        type: 'string'
      },
      hospitalId: {
        type: 'string'
      },
      designation: {
        type: String
      },
      mobileNumber: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'OWNER', 'ADMIN_MANAGER', 'EXECUTIVE', 'MANAGER', 'CO_ORDINATOR', 'STAFF']
      },
      deviceType: {
        type: 'string',
        enum: ['IOS', 'ANDROID']
      },
      deviceToken: {
        type: 'string'
      },
      notificationStatus: {
        type: 'string'
      },
      createdBy: {
        type: 'string'
      },
      isFirstLogin: {
        type: 'boolean'
      },
      avatar: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'DELETED', 'NEW']
      }
    }
  },
  properties: {
    name: {
      type: 'string'
    },
    hospitalId: {
      type: 'string'
    },
    designation: {
      type: String
    },
    mobileNumber: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: ['ADMIN', 'ADMIN_MANAGER', 'OWNER', 'EXECUTIVE', 'MANAGER', 'CO_ORDINATOR', 'STAFF']
    },
    deviceType: {
      type: 'string',
      enum: ['IOS', 'ANDROID']
    },
    deviceToken: {
      type: 'string'
    },
    notificationStatus: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    isFirstLogin: {
      type: 'boolean'
    },
    password: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'DELETED', 'NEW']
    }
  }
}
