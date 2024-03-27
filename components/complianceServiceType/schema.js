const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    complianceType: {
      type: Schema.Types.ObjectId,
      ref: 'complianceType',
      index: true
    },
    name: {
      type: String,
      trim: true
    },
    duration: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'ACTIVE', 'DELETED ']
    }
  },
  { timestamps: true, versionKey: false }
)

const ComplianceTypeService = mongoose.model('complianceServiceType', schema)
module.exports = ComplianceTypeService
