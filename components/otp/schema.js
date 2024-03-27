const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    code: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['LOGIN'],
      required: true
    },
    status: {
      type: String,
      default: 'UN_VERIFIED',
      enum: ['UN_VERIFIED', 'VERIFIED', 'EXPIRED']
    }
  },
  { timestamps: true, versionKey: false }
)

const Otp = mongoose.model('otps', schema)
module.exports = Otp
