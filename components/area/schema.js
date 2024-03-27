const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      trim: true,
      unique: true,
      required: [true, 'Name is required.']
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: 'states',
      required: [true, 'State is required.']
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: 'city',
      required: [true, 'City is required.']
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'ACTIVE', 'DELETED ']
    }
  },
  { timestamps: true, versionKey: false }
)

const Areas = mongoose.model('areas', schema)
module.exports = Areas
