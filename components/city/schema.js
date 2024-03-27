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
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'ACTIVE', 'DELETED ']
    }
  },
  { timestamps: true, versionKey: false }
)

const Cities = mongoose.model('city', schema)
module.exports = Cities
