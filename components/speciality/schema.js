const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true
    },
    description: {
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

const Speciality = mongoose.model('speciality', schema)
module.exports = Speciality
