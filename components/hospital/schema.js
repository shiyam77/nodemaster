const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    nabhCertificationName: {
      type: String,
      trim: true
    },
    nabhCertificationNumber: {
      type: String,
      trim: true
    },
    noOfBeds: {
      type: String,
      trim: true
    },
    speciality: [{
      type: Schema.Types.ObjectId,
      ref: 'speciality',
      default: null
    }],
    address: {
      type: String,
      trim: true
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'state'
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'city'
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: 'areas'
    },
    pincode: {
      type: String,
      trim: true
    },
    landLineNumber: {
      type: String,
      trim: true
    },
    commonMobileNumber: {
      type: String,
      trim: true
    },
    websiteUrl: {
      type: String,
      trim: true
    },
    commonEmail: {
      type: String,
      trim: true
    },
    nameOfHospitalHead: {
      type: String,
      trim: true
    },
    designation: {
      type: String,
      trim: true
    },
    mobile: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    paymentStatus: {
      type: String,
      default: 'PAID',
      enum: ['PAID', 'UNPAID']
    },
    registrationDate: {
      type: Date
    },
    staffCount: {
      type: Number
    },
    typeOfNABH: {
      type: String,
      default: 'Full NABH',
      enum: ['Full NABH', 'Entry Level NABH']
    },
    status: {
      type: String,
      default: 'INACTIVE',
      enum: ['ACTIVE', 'INACTIVE', 'IN_REVIEW', 'SUSPENDED', 'DELETED', 'NEW']
    }
  },
  { timestamps: true, versionKey: false }
)

const Hospitals = mongoose.model('hospitals', schema)
module.exports = Hospitals
