const Compliance = require('../compliance/schema')
const Hospital = require('../hospital/schema')
const { errLogger } = require('../../config/logger')
const { COMPLIANCE_STATUS, STATUS, PAYMENT_STATUS } = require('../../libs/constants')

class Service {
  async dashBoardStat (req) {
    const compliancePendingList = await Compliance.find({ hospitalId: req.user.hospitalId, status: COMPLIANCE_STATUS.APPROVED, cycle1ValidTo: { $lte: new Date() }, validTo: { $gte: new Date() } }).countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'dashboard-compliance-details', message: e.message })
    })
    const complianceExpiredList = await Compliance.find({ hospitalId: req.user.hospitalId, status: COMPLIANCE_STATUS.EXPIRED }).countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'dashboard-compliance-details', message: e.message })
    })

    const hospitalList = await Hospital.find({ status: STATUS.ACTIVE }).select('nabhCertificationName mobileNumber email paymentStatus mobile registrationDate status createdAt').sort({ createdAt: 'descending' }).limit(5).lean().catch((e) => {
      errLogger.error({ method: 'dashboard-hospital-details', message: e.message })
    })

    const signedUpHospitals = await Hospital.find().countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'dashboard-compliance-details', message: e.message })
    })

    const activeHospitals = await Hospital.find({ status: STATUS.ACTIVE }).countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'dashboard-compliance-details', message: e.message })
    })

    const unpaidHospitals = await Hospital.find({ paymentStatus: PAYMENT_STATUS.UNPAID }).countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'dashboard-compliance-details', message: e.message })
    })

    const data = {
      active: 0,
      expired: 0,
      due: 0,
      hospitals: [],
      signedUpHospitals: 0,
      activeHospitals: 0,
      unpaidHospitals: 0,
      complianceCount: 93
    }
    if (compliancePendingList) {
      data.due = compliancePendingList
    }
    if (complianceExpiredList) {
      data.expired = complianceExpiredList
    }
    if (signedUpHospitals) {
      data.signedUpHospitals = signedUpHospitals
    }
    if (signedUpHospitals) {
      data.hospitals = hospitalList
    }
    if (activeHospitals) {
      data.activeHospitals = activeHospitals
    }
    if (unpaidHospitals) {
      data.unpaidHospitals = unpaidHospitals
    }
    const hospitalComplianceList = await Compliance.find({ hospitalId: req.user.hospitalId, status: COMPLIANCE_STATUS.APPROVED, cycle1ValidTo: { $gt: new Date() } }).countDocuments().lean().catch((e) => {
      errLogger.error({ method: 'dashboard-compliance', message: e.message })
    })
    data.active = hospitalComplianceList
    return data
  }
}

module.exports = Service
