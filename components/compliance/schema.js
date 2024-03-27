const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
      index: true
    },
    certificateType: {
      type: String,
      default: ''
    },
    image: {
      type: Array,
      trim: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'complianceType',
      index: true
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'complianceServiceType',
      index: true
    },
    validFrom: {
      type: Date,
      default: ''
    },
    validTo: {
      type: Date,
      default: ''
    },
    renewalCycle: {
      type: String,
      trim: true
    },
    cycle1: {
      type: String,
      trim: true
    },
    cycle1ValidTo: {
      type: Date,
      default: ''
    },
    cycle2: {
      type: String,
      trim: true
    },
    cycle2ValidTo: {
      type: Date,
      default: ''
    },
    cycle3: {
      type: String,
      trim: true
    },
    cycle3ValidTo: {
      type: Date,
      default: ''
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    approvedAt: {
      type: Date,
      default: ''
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    rejectedAt: {
      type: Date,
      default: ''
    },
    rejectedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    ownedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    status: {
      type: 'string',
      default: 'NEW',
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'NEW', 'EXPIRED'],
      index: true
    },
    assignedTo: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }]
  },
  { timestamps: true, versionKey: false }
)

const Compliance = mongoose.model('compliance', schema)
module.exports = Compliance
