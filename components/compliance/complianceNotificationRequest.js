const moment = require('moment')

class ComplianceNotificationRequest {
  build (params, result) {
    return [
      {
        hospitalId: result.hospitalId,
        complianceId: result._id,
        type: 'CYCLE1',
        notification: true,
        when: moment(params.cycle1ValidTo, 'YYYY-MM-DD').format('YYYY-MM-DD')
      },
      {
        hospitalId: result.hospitalId,
        complianceId: result._id,
        type: 'CYCLE2',
        notification: true,
        when: moment(params.cycle2ValidTo, 'YYYY-MM-DD').format('YYYY-MM-DD')
      },
      {
        hospitalId: result.hospitalId,
        complianceId: result._id,
        type: 'CYCLE3',
        notification: true,
        when: moment(params.cycle3ValidTo, 'YYYY-MM-DD').format('YYYY-MM-DD')
      },
      {
        hospitalId: result.hospitalId,
        complianceId: result._id,
        type: 'EXPIRY',
        notification: true,
        // when: moment(params.validTo).add(1, 'days').format('YYYY-MM-DD')
        when: moment(params.validTo, 'YYYY-MM-DD').format('YYYY-MM-DD')
      }
    ]
  }
}

module.exports = ComplianceNotificationRequest
