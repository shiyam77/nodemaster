const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      index: true
    },
    duration: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'ACTIVE', 'DELETED ']
    },
    isComplianceServiceTypeAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true, versionKey: false }
)

const ComplianceType = mongoose.model('complianceType', schema)
module.exports = ComplianceType
