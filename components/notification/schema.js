const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals'
    },
    state: [{
      type: Schema.Types.ObjectId,
      ref: 'state'
    }],
    city: [{
      type: Schema.Types.ObjectId,
      ref: 'city'
    }],
    area: [{
      type: Schema.Types.ObjectId,
      ref: 'areas'
    }],
    response: {
      type: Object
    },
    userType: {
      type: String,
      enum: ['ALL_USERS', 'MANAGER', 'CO_ORDINATOR', 'STAFF', 'CO_ORDINATOR_AND_STAFF']
    },
    dataType: {
      type: String
    },
    type: {
      type: String,
      enum: ['NABH', 'NOTIFICATIONS']
    },
    category: {
      type: String,
      enum: ['MANUAL_NOTIFICATION', 'COMPLIANCE_NOTIFICATION']
    },
    isSent: {
      type: Boolean,
      default: false
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)

const Notification = mongoose.model('notifications', schema)
module.exports = Notification
