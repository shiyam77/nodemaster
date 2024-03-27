const mongoose = require('mongoose')

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
    image: {
      type: Array,
      trim: true
    },
    video: {
      type: Array,
      trim: true
    },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      index: true
    }
  },
  { timestamps: true, versionKey: false }
)

schema.index({ title: 'text', description: 'text' })

const Feeds = mongoose.model('feeds', schema)
module.exports = Feeds
