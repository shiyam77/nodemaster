const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true
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
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED']
    }
  },
  { timestamps: true, versionKey: false }
)

const Interest = mongoose.model('interests', schema)
module.exports = Interest
