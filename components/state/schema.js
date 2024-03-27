const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      trim: true,
      unique: true,
      required: [true, 'Name is required.']
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'ACTIVE', 'DELETED ']
    }
  },
  { timestamps: true, versionKey: false }
)

const State = mongoose.model('states', schema)
module.exports = State
