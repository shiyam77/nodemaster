const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
      default: null
    },
    designation: {
      type: String
    },
    mobileNumber: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    role: {
      type: String,
      enum: ['ADMIN', 'ADMIN_MANAGER', 'OWNER', 'EXECUTIVE', 'MANAGER', 'CO_ORDINATOR', 'STAFF']
    },
    deviceType: {
      type: String,
      enum: ['IOS', 'ANDROID']
    },
    deviceToken: {
      type: String
    },
    notificationStatus: {
      type: String,
      default: 'ON',
      enum: ['ON', 'OFF']
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    isFirstLogin: {
      type: Boolean,
      default: true
    },
    password: {
      type: String,
      select: false
    },
    avatar: {
      type: String
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'DELETED', 'NEW', 'SUSPENDED']
    }
  },
  { timestamps: true, versionKey: false }
)

schema.virtual('permission', {
  ref: 'permission',
  localField: '_id',
  foreignField: 'user'
})

const User = mongoose.model('users', schema)
module.exports = User
