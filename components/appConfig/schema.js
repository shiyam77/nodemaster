const mongoose = require('mongoose')
const Schema = mongoose.Schema

const iosSchema = new Schema({
  versionCode: {
    type: Number,
    trim: true,
    required: true,
    index: true
  },
  isUpdateAvailable: {
    type: String,
    enum: ['0', '1'],
    default: '0'
  },
  isForceUpdate: {
    type: String,
    enum: ['0', '1'],
    default: '0'
  },
  appStoreLink: {
    type: String,
    trim: true
  },
  versionAlertTitle: {
    type: String,
    trim: true
  },
  versionAlertContent: {
    type: String,
    trim: true
  },
  storeMarketId: {
    type: String,
    trim: true
  }

}, { _id: false })

const androidSchema = new Schema({
  versionCode: {
    type: Number,
    trim: true,
    required: true,
    index: true
  },
  isUpdateAvailable: {
    type: String,
    enum: ['0', '1'],
    default: '0'
  },
  isForceUpdate: {
    type: String,
    enum: ['0', '1'],
    default: '0'
  },
  playStoreLink: {
    type: String,
    trim: true
  },
  versionAlertTitle: {
    type: String,
    trim: true
  },
  versionAlertContent: {
    type: String,
    trim: true
  },
  storeMarketId: {
    type: String,
    trim: true
  }
}, { _id: false })

const schema = new mongoose.Schema(
  {
    ios: iosSchema,
    android: androidSchema,
    resendOtpTimer: {
      type: Number,
      trim: true
    },
    validityPeriod: {
      type: Number,
      trim: true
    },
    supportContact: {
      type: Number,
      default: '0',
      trim: true
    },
    lang: {
      en_us: {
        type: String,
        trim: true
      },
      ta_in: {
        type: String,
        trim: true
      }
    }
  },
  { timestamps: true, versionKey: false }
)

const AppSetting = mongoose.model('appconfig', schema)
module.exports = AppSetting
