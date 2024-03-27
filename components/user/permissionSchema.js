const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      index: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'complianceType'
    },
    service: [{
      type: Schema.Types.ObjectId,
      ref: 'complianceServiceType'
    }]
  },
  { timestamps: true, versionKey: false }
)

const Permission = mongoose.model('permission', schema)
module.exports = Permission
