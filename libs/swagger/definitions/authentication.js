module.exports = {
  authenticate: {
    required: [
      'email',
      'password'
    ],
    properties: {
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  },
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
}
