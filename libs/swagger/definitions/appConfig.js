module.exports = {
  create: {
    required: [
      'android',
      'ios',
      'validityPeriod',
      'resendOtpTimer'
    ],
    properties: {
      android: {
        type: 'object',
        properties: {
          versionCode: {
            type: 'number'
          },
          isUpdateAvailable: {
            type: 'string',
            enum: ['0', '1']
          },
          isForceUpdate: {
            type: 'string',
            enum: ['0', '1']
          },
          playStoreLink: {
            type: 'string'
          },
          versionAlertTitle: {
            type: 'string'
          },
          versionAlertContent: {
            type: 'string'
          },
          storeMarketId: {
            type: 'string'
          }
        }
      },
      ios: {
        type: 'object',
        properties: {
          versionCode: {
            type: 'number'
          },
          isUpdateAvailable: {
            type: 'string',
            enum: ['0', '1']
          },
          isForceUpdate: {
            type: 'string',
            enum: ['0', '1']
          },
          appStoreLink: {
            type: 'string'
          },
          versionAlertTitle: {
            type: 'string'
          },
          versionAlertContent: {
            type: 'string'
          },
          storeMarketId: {
            type: 'string'
          }
        }
      },
      resendOtpTimer: {
        type: 'number',
        trim: true
      },
      validityPeriod: {
        type: 'number',
        trim: true
      },
      supportContact: {
        type: 'number',
        default: '0',
        trim: true
      },
      lang: {
        type: 'object',
        properties: {
          en_us: {
            type: 'string',
            trim: true
          },
          ta_in: {
            type: 'string',
            trim: true
          }
        }
      }
    }
  },
  update: {
    properties: {
      android: {
        type: 'object',
        properties: {
          versionCode: {
            type: 'number'
          },
          isUpdateAvailable: {
            type: 'string',
            enum: ['0', '1']
          },
          isForceUpdate: {
            type: 'string',
            enum: ['0', '1']
          },
          playStoreLink: {
            type: 'string'
          },
          versionAlertTitle: {
            type: 'string'
          },
          versionAlertContent: {
            type: 'string'
          },
          storeMarketId: {
            type: 'string'
          }
        }
      },
      ios: {
        type: 'object',
        properties: {
          versionCode: {
            type: 'number'
          },
          isUpdateAvailable: {
            type: 'string',
            enum: ['0', '1']
          },
          isForceUpdate: {
            type: 'string',
            enum: ['0', '1']
          },
          appStoreLink: {
            type: 'string'
          },
          versionAlertTitle: {
            type: 'string'
          },
          versionAlertContent: {
            type: 'string'
          },
          storeMarketId: {
            type: 'string'
          }
        }
      },
      resendOtpTimer: {
        type: 'number',
        trim: true
      },
      validityPeriod: {
        type: 'number',
        trim: true
      },
      supportContact: {
        type: 'number',
        default: '0',
        trim: true
      },
      lang: {
        type: 'object',
        properties: {
          en_us: {
            type: 'string',
            trim: true
          },
          ta_in: {
            type: 'string',
            trim: true
          }
        }
      }
    }
  },
  checkVersion: {
    required: [
      'deviceType',
      'versionCode'
    ],
    properties: {
      deviceType: {
        type: 'string',
        enum: ['ANDROID', 'IOS']
      },
      versionCode: {
        type: 'number'
      }
    }
  },
  properties: {
    android: {
      type: 'object',
      properties: {
        versionCode: {
          type: 'number'
        },
        isUpdateAvailable: {
          type: 'string',
          enum: ['0', '1']
        },
        isForceUpdate: {
          type: 'string',
          enum: ['0', '1']
        },
        playStoreLink: {
          type: 'string'
        },
        versionAlertTitle: {
          type: 'string'
        },
        versionAlertContent: {
          type: 'string'
        },
        storeMarketId: {
          type: 'string'
        }
      }
    },
    ios: {
      type: 'object',
      properties: {
        versionCode: {
          type: 'number'
        },
        isUpdateAvailable: {
          type: 'string',
          enum: ['0', '1']
        },
        isForceUpdate: {
          type: 'string',
          enum: ['0', '1']
        },
        appStoreLink: {
          type: 'string'
        },
        versionAlertTitle: {
          type: 'string'
        },
        versionAlertContent: {
          type: 'string'
        },
        storeMarketId: {
          type: 'string'
        }
      }
    },
    resendOtpTimer: {
      type: 'number',
      trim: true
    },
    validityPeriod: {
      type: 'number',
      trim: true
    },
    supportContact: {
      type: 'number',
      default: '0',
      trim: true
    },
    lang: {
      type: 'object',
      properties: {
        en_us: {
          type: 'string',
          trim: true
        },
        ta_in: {
          type: 'string',
          trim: true
        }
      }
    }
  }
}
