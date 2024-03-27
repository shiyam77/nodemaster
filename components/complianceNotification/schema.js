const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    complianceId: {
      type: Schema.Types.ObjectId,
      ref: 'compliance'
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals'
    },
    type: {
      type: String,
      enum: ['CYCLE1', 'CYCLE2', 'CYCLE3', 'EXPIRY']
    },
    sms: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    },
    notification: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    when: {
      type: Date
    }
  },
  { timestamps: true, versionKey: false }
)

const ComplianceNotification = mongoose.model('compliancenotifications', schema)
module.exports = ComplianceNotification
