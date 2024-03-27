module.exports = {
  create: {
    required: [
      'name',
      'nabhCertificationName',
      'nabhCertificationNumber',
      'noOfBeds',
      'speciality',
      'address',
      'city',
      'state',
      'pincode',
      'landLineNumber',
      'commonMobileNumber',
      'websiteUrl',
      'commonEmail',
      'nameOfHospitalHead',
      'designation',
      'mobile',
      'email',
      'createdBy'
    ],
    properties: {
      name: {
        type: 'string'
      },
      nabhCertificationName: {
        type: 'string'
      },
      nabhCertificationNumber: {
        type: 'string'
      },
      noOfBeds: {
        type: 'string'
      },
      speciality: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      address: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      state: {
        type: 'string'
      },
      pincode: {
        type: 'string'
      },
      landLineNumber: {
        type: 'string'
      },
      commonMobileNumber: {
        type: 'string'
      },
      websiteUrl: {
        type: 'string'
      },
      commonEmail: {
        type: 'string'
      },
      nameOfHospitalHead: {
        type: 'string'
      },
      designation: {
        type: 'string'
      },
      mobile: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      createdBy: {
        type: 'string'
      },
      status: {
        type: 'string',
        default: 'INACTIVE',
        enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'DELETED', 'NEW']
      }
    }
  },
  update: {
    properties: {
      name: {
        type: 'string'
      },
      nabhCertificationName: {
        type: 'string'
      },
      nabhCertificationNumber: {
        type: 'string'
      },
      noOfBeds: {
        type: 'string'
      },
      speciality: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      address: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      state: {
        type: 'string'
      },
      pincode: {
        type: 'string'
      },
      landLineNumber: {
        type: 'string'
      },
      commonMobileNumber: {
        type: 'string'
      },
      websiteUrl: {
        type: 'string'
      },
      commonEmail: {
        type: 'string'
      },
      nameOfHospitalHead: {
        type: 'string'
      },
      designation: {
        type: 'string'
      },
      mobile: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      createdBy: {
        type: 'string'
      },
      paymentStatus: {
        type: 'string',
        default: 'UNPAID',
        enum: ['PAID', 'UNPAID']
      },
      status: {
        type: 'string',
        default: 'INACTIVE',
        enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'SUSPENDED', 'DELETED', 'NEW']
      }
    }
  },
  properties: {
    name: {
      type: 'string'
    },
    nabhCertificationName: {
      type: 'string'
    },
    nabhCertificationNumber: {
      type: 'string'
    },
    noOfBeds: {
      type: 'string'
    },
    speciality: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    address: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    pincode: {
      type: 'string'
    },
    landLineNumber: {
      type: 'string'
    },
    commonMobileNumber: {
      type: 'string'
    },
    websiteUrl: {
      type: 'string'
    },
    commonEmail: {
      type: 'string'
    },
    nameOfHospitalHead: {
      type: 'string'
    },
    designation: {
      type: 'string'
    },
    mobile: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    paymentStatus: {
      type: 'string',
      default: 'UNPAID',
      enum: ['PAID', 'UNPAID']
    },
    registrationDate: {
      type: 'date'
    },
    status: {
      type: 'string',
      default: 'INACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'SUSPENDED', 'DELETED', 'NEW']
    }
  }
}
