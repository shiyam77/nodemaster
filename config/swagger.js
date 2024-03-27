const definitions = require('../libs/swagger/definitions/index')

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Compliance App-API',
    description: ''
  },
  host: `${process.env.HOST}`,
  basePath: '/api/v1',
  tags: [
    {
      name: 'Authentication',
      description: 'Generate Auth Token to access resources'
    },
    {
      name: 'Otp',
      description: 'API for Otp'
    },
    {
      name: 'User',
      description: 'API for Users'
    },
    {
      name: 'Hospital',
      description: 'API for Hospital'
    },
    {
      name: 'Compliance',
      description: 'API for Compliance'
    },
    {
      name: 'Compliance Type',
      description: 'API for Compliance Type'
    },
    {
      name: 'Compliance Service Type',
      description: 'API for Compliance Service Type'
    },
    {
      name: 'Feed',
      description: 'API for Feeds'
    },
    {
      name: 'State',
      description: 'API for State'
    },
    {
      name: 'City',
      description: 'API for City'
    },
    {
      name: 'Area',
      description: 'API for Area'
    },
    {
      name: 'Speciality',
      description: 'API for Speciality'
    },
    {
      name: 'Uploads',
      description: 'API for Uploads'
    },
    {
      name: 'AppConfig',
      description: 'API for App Config'
    },
    {
      name: 'Notification',
      description: 'API for Notification'
    },
    {
      name: 'Interest',
      description: 'API for Interest'
    }
  ],
  schemes: `${process.env.SCHEMES}`.split(','),
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    auth: {
      type: 'apiKey',
      description: 'JWT authorization of an API',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { auth: [] }
  ],
  paths: {
    '/auth/admin/login': {
      post: {
        tags: ['Authentication'],
        description: 'Create new admin auth token to access admin resources',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/Auth/authenticate'
            }
          }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        description: 'Create new Auth Token to access resources',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/Auth/authenticate'
            }
          }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user/admin-user': {
      post: {
        tags: ['User'],
        summary: 'Create new admin user for hospital management',
        description: '',
        operationId: 'addAdminUser',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/User/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['User'],
        summary: 'Get admin users list',
        description: '',
        operationId: 'findAdminUser',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return Based on user name',
            type: 'string'
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return Based on user email',
            type: 'string'
          },
          {
            name: 'role',
            in: 'query',
            description: 'Return Based on user role',
            enum: ['EXECUTIVE', 'ADMIN_MANAGER'],
            type: 'string'
          },
          {
            name: 'mobileNumber',
            in: 'query',
            description: 'Return Based on user mobile',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user/admin': {
      post: {
        tags: ['User'],
        summary: 'Create new user for hospital management',
        description: '',
        operationId: 'addUserByAdmin',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/User/byAdmin'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['User'],
        summary: 'Get users list',
        description: '',
        operationId: 'findUsersByAdmin',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return Based on user email',
            type: 'string'
          },
          {
            name: 'mobileNumber',
            in: 'query',
            description: 'Return Based on user mobile',
            type: 'string'
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user/admin/{id}': {
      put: {
        tags: ['User'],
        summary: 'Update an existing user/hospital',
        description: '',
        operationId: 'updateUserByAdmin',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of hospital that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated user object',
            required: true,
            schema: {
              $ref: '#/definitions/User/byAdmin'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user': {
      post: {
        tags: ['User'],
        summary: 'Add a new user',
        description: '',
        operationId: 'addUser',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/User/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['User'],
        summary: 'Find users',
        description: '',
        operationId: 'findUsers',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return Based on user email',
            type: 'string'
          },
          {
            name: 'mobileNumber',
            in: 'query',
            description: 'Return Based on user mobile',
            type: 'string'
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user/{id}': {
      get: {
        tags: ['User'],
        summary: 'Find user by ID',
        description: 'Returns a single user',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single user data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['User'],
        summary: 'Update an existing user',
        description: '',
        operationId: 'updateUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of user that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated user object',
            required: true,
            schema: {
              $ref: '#/definitions/User/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['User'],
        summary: 'Delete User by ID',
        description: 'Delete single User data',
        operationId: 'deleteUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single User data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user/profile': {
      get: {
        tags: ['User'],
        summary: 'Get user details by access token',
        description: '',
        operationId: 'getUserProfile',
        parameters: [
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['User'],
        summary: 'Updates user details by access token',
        description: '',
        operationId: 'updateUserProfile',
        parameters: [
          {
            in: 'body',
            name: 'user',
            description: 'Updated user object',
            required: true,
            schema: {
              $ref: '#/definitions/User/updateUser'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/user/unique-mobile': {
      post: {
        tags: ['User'],
        summary: 'Check duplicate mobile number',
        description: '',
        operationId: 'checkUserMobileNumber',
        parameters: [
          {
            name: 'uniqueMobile',
            in: 'body',
            schema: {
              $ref: '#/definitions/User/uniqueMobile'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/hospital': {
      post: {
        tags: ['Hospital'],
        summary: 'Add a new hospital',
        description: '',
        operationId: 'addHospital',
        parameters: [
          {
            name: 'hospital',
            in: 'body',
            schema: {
              $ref: '#/definitions/Hospital/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Hospital'],
        summary: 'Find hospital',
        description: '',
        operationId: 'findHospital',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return Based on hospital name',
            type: 'string'
          },
          {
            name: 'mobileNumber',
            in: 'query',
            description: 'Return Based on mobile number',
            type: 'string'
          },
          {
            name: 'fromDate',
            in: 'query',
            description: 'Return Based on registrationDate',
            type: 'string'
          },
          {
            name: 'toDate',
            in: 'query',
            description: 'Return Based on registrationDate',
            type: 'string'
          },
          {
            name: 'paymentStatus',
            in: 'query',
            description: 'Return Based on payment status',
            type: 'string',
            enum: ['PAID', 'UNPAID']
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            default: 'ALL',
            enum: ['ALL', 'ACTIVE', 'INACTIVE', 'IN_REVIEW', 'SUSPENDED', 'DELETED', 'NEW']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Hospital'],
        summary: 'Update an existing hospital',
        description: '',
        operationId: 'updateHospital',
        parameters: [
          {
            in: 'body',
            name: 'user',
            description: 'Updated hospital object',
            required: true,
            schema: {
              $ref: '#/definitions/Hospital/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/hospital/{id}': {
      get: {
        tags: ['Hospital'],
        summary: 'Find hospital by ID',
        description: 'Returns a single hospital',
        operationId: 'getHospitalById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single hospital data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Hospital'],
        summary: 'Update an hospital payment status',
        description: '',
        operationId: 'updateHospitalPaymentStatus',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single hospital data',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated hospital object',
            required: true,
            schema: {
              $ref: '#/definitions/Hospital/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Hospital'],
        summary: 'Delete hospital by ID',
        description: 'Delete single hospital data',
        operationId: 'deleteHospital',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single hospital data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/compliance': {
      post: {
        tags: ['Compliance'],
        summary: 'Add a new compliance',
        description: '',
        operationId: 'addCompliance',
        parameters: [
          {
            name: 'compliance',
            in: 'body',
            schema: {
              $ref: '#/definitions/Compliance/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Compliance'],
        summary: 'Find compliance',
        description: '',
        operationId: 'findCompliance',
        parameters: [
          {
            name: 'hospitalId',
            in: 'query',
            description: 'Return based on hospital id',
            type: 'string'
          },
          {
            name: 'createdBy',
            in: 'query',
            description: 'Return based on createdBy',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/compliance/{id}': {
      get: {
        tags: ['Compliance'],
        summary: 'Find compliance by ID',
        description: 'Returns a single compliance',
        operationId: 'getComplianceById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single compliance data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Compliance'],
        summary: 'Update an existing compliance',
        description: '',
        operationId: 'updateCompliance',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of compliance that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated compliance object',
            required: true,
            schema: {
              $ref: '#/definitions/Compliance/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Compliance'],
        summary: 'Delete compliance by ID',
        description: 'Delete single compliance data',
        operationId: 'deleteCompliance',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single compliance data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/complianceservicetype': {
      post: {
        tags: ['Compliance Service Type'],
        summary: 'Add a new complianceservicetype',
        description: '',
        operationId: 'addHospital',
        parameters: [
          {
            name: 'complianceservicetype',
            in: 'body',
            schema: {
              $ref: '#/definitions/ComplianceServiceType/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Compliance Service Type'],
        summary: 'Find complianceservicetype',
        description: '',
        operationId: 'findHospital',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/complianceservicetype/{id}': {
      get: {
        tags: ['Compliance Service Type'],
        summary: 'Find complianceservicetype by ID',
        description: 'Returns a single complianceservicetype',
        operationId: 'getHospitalById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single complianceservicetype data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Compliance Service Type'],
        summary: 'Update an existing complianceservicetype',
        description: '',
        operationId: 'updateHospital',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of complianceservicetype that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated complianceservicetype object',
            required: true,
            schema: {
              $ref: '#/definitions/ComplianceServiceType/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Compliance Service Type'],
        summary: 'Delete complianceservicetype by ID',
        description: 'Delete single complianceservicetype data',
        operationId: 'deleteHospital',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single complianceservicetype data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/compliancetype': {
      post: {
        tags: ['Compliance Type'],
        summary: 'Add a new compliance type',
        description: '',
        operationId: 'addComplianceType',
        parameters: [
          {
            name: 'complianceType',
            in: 'body',
            schema: {
              $ref: '#/definitions/ComplianceType/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Compliance Type'],
        summary: 'Find compliance type',
        description: '',
        operationId: 'findComplianceType',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on compliance status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/compliancetype/{id}': {
      get: {
        tags: ['Compliance Type'],
        summary: 'Find compliance type by ID',
        description: 'Returns a single compliance type',
        operationId: 'getComplianceTypeById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single compliance type data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Compliance Type'],
        summary: 'Update an existing compliance type',
        description: '',
        operationId: 'updateComplianceType',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of compliance type that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated compliance type object',
            required: true,
            schema: {
              $ref: '#/definitions/Complianceype/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Compliance Type'],
        summary: 'Delete compliance type by ID',
        description: 'Delete single compliance typedata',
        operationId: 'deleteComplianceType',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single compliance type data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/feed': {
      post: {
        tags: ['Feed'],
        summary: 'Add a new feed',
        description: '',
        operationId: 'addFeed',
        parameters: [
          {
            name: 'feed',
            in: 'body',
            schema: {
              $ref: '#/definitions/Feed/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Feed'],
        summary: 'Find feeds',
        description: '',
        operationId: 'findFeeds',
        parameters: [
          {
            name: 's',
            in: 'query',
            description: 'Return Based on title and description',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/feed/{id}': {
      get: {
        tags: ['Feed'],
        summary: 'Find feed by ID',
        description: 'Returns a single feed',
        operationId: 'getFeedById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single feed data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Feed'],
        summary: 'Update an existing feed',
        description: '',
        operationId: 'updateFeed',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of feed that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated feed object',
            required: true,
            schema: {
              $ref: '#/definitions/Feed/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Feed'],
        summary: 'Delete feed by ID',
        description: 'Delete single feed data',
        operationId: 'deleteFeed',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single feed data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/state': {
      post: {
        tags: ['State'],
        summary: 'Add a new state',
        description: '',
        operationId: 'addState',
        parameters: [
          {
            name: 'state',
            in: 'body',
            schema: {
              $ref: '#/definitions/State/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['State'],
        summary: 'Find state',
        description: '',
        operationId: 'findState',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return Based on state name',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/state/{id}': {
      get: {
        tags: ['State'],
        summary: 'Find state by ID',
        description: 'Returns a single state',
        operationId: 'getStateById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single state data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['State'],
        summary: 'Update an existing state',
        description: '',
        operationId: 'updateState',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of state that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated state object',
            required: true,
            schema: {
              $ref: '#/definitions/State/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['State'],
        summary: 'Delete state by ID',
        description: 'Delete single state data',
        operationId: 'deleteState',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single state data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/city': {
      post: {
        tags: ['City'],
        summary: 'Add a new city',
        description: '',
        operationId: 'addCity',
        parameters: [
          {
            name: 'city',
            in: 'body',
            schema: {
              $ref: '#/definitions/City/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['City'],
        summary: 'Find city',
        description: '',
        operationId: 'findCity',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return Based on city name',
            type: 'string'
          },
          {
            name: 'state',
            in: 'query',
            description: 'Return Based on state name',
            type: 'string'
          },
          {
            name: 'state',
            in: 'query',
            description: 'Return Based on state name',
            type: 'string'
          },
          {
            name: 'paymentStatus',
            in: 'query',
            description: 'Return Based on paymentStatus',
            type: 'string',
            enum: ['PAID', 'UNPAID']
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/city/{id}': {
      get: {
        tags: ['City'],
        summary: 'Find city by ID',
        description: 'Returns a single city',
        operationId: 'getCityById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single city data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['City'],
        summary: 'Update an existing city',
        description: '',
        operationId: 'updateCity',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of city that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated city object',
            required: true,
            schema: {
              $ref: '#/definitions/City/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['City'],
        summary: 'Delete city by ID',
        description: 'Delete single city data',
        operationId: 'deleteCity',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single city data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/area': {
      post: {
        tags: ['Area'],
        summary: 'Add a new area',
        description: '',
        operationId: 'addArea',
        parameters: [
          {
            name: 'area',
            in: 'body',
            schema: {
              $ref: '#/definitions/Area/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Area'],
        summary: 'Find area',
        description: '',
        operationId: 'findArea',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return Based on area name',
            type: 'string'
          },
          {
            name: 'city',
            in: 'query',
            description: 'Return Based on city name',
            type: 'string'
          },
          {
            name: 'state',
            in: 'query',
            description: 'Return Based on state name',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on area status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/area/{id}': {
      get: {
        tags: ['Area'],
        summary: 'Find area by ID',
        description: 'Returns a single area',
        operationId: 'getAreaById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single area data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Area'],
        summary: 'Update an existing area',
        description: '',
        operationId: 'updateArea',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of area that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated area object',
            required: true,
            schema: {
              $ref: '#/definitions/Area/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Area'],
        summary: 'Delete area by ID',
        description: 'Delete single area data',
        operationId: 'deleteArea',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single area data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/speciality': {
      post: {
        tags: ['Speciality'],
        summary: 'Add a new speciality',
        description: '',
        operationId: 'addSpeciality',
        parameters: [
          {
            name: 'speciality',
            in: 'body',
            schema: {
              $ref: '#/definitions/Speciality/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Speciality'],
        summary: 'Find speciality',
        description: '',
        operationId: 'findSpeciality',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on user status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/speciality/{id}': {
      get: {
        tags: ['Speciality'],
        summary: 'Find speciality by ID',
        description: 'Returns a single speciality',
        operationId: 'getSpecialityById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single speciality data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Speciality'],
        summary: 'Update an existing speciality',
        description: '',
        operationId: 'updateSpeciality',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of speciality that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated speciality object',
            required: true,
            schema: {
              $ref: '#/definitions/Speciality/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Speciality'],
        summary: 'Delete speciality by ID',
        description: 'Delete single speciality data',
        operationId: 'deleteSpeciality',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single speciality data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/otp/generate': {
      post: {
        tags: ['Otp'],
        summary: 'Generate Otp',
        description: 'Send OTP to user from compliance app system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/Otp/generateOtp'
            }
          }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/otp/verify': {
      post: {
        tags: ['Otp'],
        summary: 'Verify OTP',
        description: 'Verify OTP in compliance app System',
        parameters: [
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/definitions/Otp/verifyOtp'
            }
          }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/fileuploads/': {
      post: {
        tags: ['Uploads'],
        summary: 'uploads',
        description: 'To upload',
        operationId: 'uploadFile',
        consumes: ['multipart/form-data'],
        produces: ['application/json'],
        parameters: [
          {
            name: 'type',
            in: 'formData',
            description: 'Module type',
            required: true,
            type: 'string',
            enum: ['PROFILE', 'FEEDS_IMAGE', 'FEEDS_VIDEO', 'COMPLIANCE']
          },
          {
            name: 'file_to_upload',
            in: 'formData',
            description: 'file to upload',
            required: true,
            type: 'file'
          }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/fileuploads/{id}': {
      delete: {
        tags: ['Uploads'],
        summary: 'Deletes a file',
        description: 'To deletes file',
        operationId: 'deletes3',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'KeyID to delete file',
            required: true,
            type: 'string'
          },
          {
            name: 'type',
            in: 'query',
            description: 'Type of file',
            required: true,
            type: 'string',
            enum: ['PROFILE', 'FEEDS_IMAGE', 'FEEDS_VIDEO', 'COMPLIANCE']
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/appconfig': {
      post: {
        tags: ['AppConfig'],
        summary: 'Add a new app config',
        description: 'Add new app config to System',
        parameters: [
          {
            name: 'appConfig',
            in: 'body',
            schema: {
              $ref: '#/definitions/AppConfig/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['AppConfig'],
        parameters: [
          {
            name: 'isUpdateAvailable',
            in: 'query',
            description: 'Return Based on update availability',
            type: 'string',
            enum: ['0', '1']
          },
          {
            name: 'isForceUpdate',
            in: 'query',
            description: 'Return Based on force update availability',
            type: 'string',
            enum: ['0', '1']
          },
          {
            name: 'playStoreMarketId',
            in: 'query',
            description: 'Return Based on play store market id',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        summary: 'Return list of app config',
        description: 'Returns list of active app config',
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/appconfig/checkVersion': {
      post: {
        tags: ['AppConfig'],
        summary: 'version check',
        description: 'version check',
        parameters: [
          {
            name: 'checkVersion',
            in: 'body',
            schema: {
              $ref: '#/definitions/AppConfig/checkVersion'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/appconfig/{id}': {
      get: {
        tags: ['AppConfig'],
        summary: 'Find app config by ID',
        description: 'Returns a single app config',
        operationId: 'getAppConfigById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single app config data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['AppConfig'],
        summary: 'Updates a app config',
        description: '',
        operationId: 'updateAppConfigWithForm',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of app config that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated app config object',
            required: true,
            schema: {
              $ref: '#/definitions/AppConfig/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/notification': {
      get: {
        tags: ['Notification'],
        summary: 'Find Notification',
        description: '',
        operationId: 'findNotification',
        parameters: [
          {
            name: 'hospitalId',
            in: 'query',
            description: 'Return Based on hospitalId',
            type: 'string'
          },
          {
            name: 'userId',
            in: 'query',
            description: 'Return Based on userId',
            type: 'string'
          },
          {
            name: 'type',
            in: 'query',
            description: 'Return Based on type',
            type: 'string',
            enum: ['NABH', 'NOTIFICATIONS']
          },
          {
            name: 'userType',
            in: 'query',
            description: 'Return Based on user type',
            type: 'string',
            enum: ['ALL_USERS', 'MANAGER']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/notification/manual-notification': {
      post: {
        tags: ['Notification'],
        summary: 'Add a new notification',
        description: '',
        operationId: 'addManualNotification',
        parameters: [
          {
            name: 'manualNotification',
            in: 'body',
            schema: {
              $ref: '#/definitions/Notification/manualNotification'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/notification/mark-read': {
      put: {
        tags: ['Notification'],
        summary: 'Update a notification as Read',
        description: '',
        operationId: 'markAsRead',
        parameters: [
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/interest': {
      post: {
        tags: ['Interest'],
        summary: 'Add a new interest',
        description: '',
        operationId: 'addInterest',
        parameters: [
          {
            name: 'interest',
            in: 'body',
            schema: {
              $ref: '#/definitions/Interest/create'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      get: {
        tags: ['Interest'],
        summary: 'Find interest',
        description: '',
        operationId: 'findInterest',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Return Based on name',
            type: 'string'
          },
          {
            name: 'email',
            in: 'query',
            description: 'Return Based on email',
            type: 'string'
          },
          {
            name: 'mobileNumber',
            in: 'query',
            description: 'Return Based on mobileNumber',
            type: 'string'
          },
          {
            name: 'status',
            in: 'query',
            description: 'Return Based on status',
            type: 'string',
            enum: ['ACTIVE', 'INACTIVE', 'DELETED']
          },
          {
            name: 'page',
            in: 'query',
            type: 'number',
            default: 1
          },
          {
            name: 'limit',
            in: 'query',
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/interest/{id}': {
      get: {
        tags: ['Interest'],
        summary: 'Find interest by ID',
        description: 'Returns a single interest',
        operationId: 'getInterestById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return single interest data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      put: {
        tags: ['Interest'],
        summary: 'Update an existing interest',
        description: '',
        operationId: 'updateInterest',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of interest data that needs to be updated',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated interest object',
            required: true,
            schema: {
              $ref: '#/definitions/Interest/update'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      },
      delete: {
        tags: ['Interest'],
        summary: 'Delete interest by ID',
        description: 'Delete single interest data',
        operationId: 'deleteInterest',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Delete single interest data',
            required: true,
            type: 'string'
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          200: {
            $ref: '#/definitions/Response/200'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          404: {
            $ref: '#/definitions/Response/404'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    },
    '/interest/unique-mobile': {
      post: {
        tags: ['Interest'],
        summary: 'Check duplicate mobile number',
        description: '',
        operationId: 'checkInterestMobileNumber',
        parameters: [
          {
            name: 'uniqueMobile',
            in: 'body',
            schema: {
              $ref: '#/definitions/User/uniqueMobile'
            }
          },
          { $ref: '#/definitions/Headers/content_type' }
        ],
        responses: {
          201: {
            $ref: '#/definitions/Response/201'
          },
          400: {
            $ref: '#/definitions/Response/400'
          },
          401: {
            $ref: '#/definitions/Response/401'
          },
          500: {
            $ref: '#/definitions/Response/500'
          }
        }
      }
    }
  },

  definitions
}
