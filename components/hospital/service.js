const _ = require('lodash')
const mongoose = require('mongoose')
const moment = require('moment')
const Hospital = require('./schema')
const { errLogger } = require('../../config/logger')
const { STATUS } = require('../../libs/constants')
const ComplianceService = require('../complianceServiceType/schema')

class Service {
  async createHospital (params) {
    const data = new Hospital(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'Hospital-save', message: e.message })
    })
  }

  async getHospitalAndCount (req) {
    const reqQuery = req.query
    const limit = Number(
      reqQuery.limit ? reqQuery.limit : process.env.PAGE_LIMIT
    )
    const pageNo = Number(reqQuery.page ? limit * reqQuery.page - limit : 0)
    const sortField = reqQuery.sort ? reqQuery.sort : 'createdAt'
    const order = reqQuery.order && reqQuery.order === 'asc' ? 1 : -1
    const match = { $and: [] }
    if (reqQuery.status === STATUS.ALL) {
      match.$and.push({ status: { $in: [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.DELETE, STATUS.SUSPENDED] } })
    } else if (reqQuery.status) {
      match.$and.push({ status: reqQuery.status })
    }

    if (reqQuery.paymentStatus) {
      match.$and.push({ paymentStatus: reqQuery.paymentStatus })
    }

    if (reqQuery.typeOfNABH) {
      match.$and.push({ typeOfNABH: reqQuery.typeOfNABH })
    }

    if (reqQuery.name) {
      match.$and.push({ nabhCertificationName: { $regex: reqQuery.name, $options: 'i' } })
    }

    if (reqQuery.mobileNumber) {
      match.$and.push({ commonMobileNumber: { $regex: reqQuery.mobileNumber, $options: 'i' } })
    }

    if (reqQuery.fromDate && reqQuery.toDate) {
      const fromDate = moment(reqQuery.fromDate).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      const toDate = moment(reqQuery.toDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      match.$and.push({ registrationDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } })
    } else if (reqQuery.fromDate) {
      const fromDate = moment(reqQuery.fromDate).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      match.$and.push({ registrationDate: { $gte: new Date(fromDate) } })
    } else if (reqQuery.toDate) {
      const toDate = moment(reqQuery.toDate).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
      match.$and.push({ registrationDate: { $lte: new Date(toDate) } })
    }

    return Hospital.aggregate([
      {
        $match: match
      },
      {
        $lookup: {
          from: 'specialities',
          let: { id: '$speciality' },
          pipeline: [
            { $match: { $expr: { $and: { $in: ['$_id', '$$id'] } } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'speciality'
        }
      },
      {
        $lookup: {
          from: 'states',
          let: { id: '$state' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'state'
        }
      },
      {
        $unwind: { path: '$state', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'cities',
          let: { id: '$city' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1, stateId: 1 } }
          ],
          as: 'city'
        }
      },
      {
        $unwind: { path: '$city', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'areas',
          let: { id: '$area' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'area'
        }
      },
      {
        $unwind: { path: '$area', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'users',
          let: { id: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$hospitalId', '$$id'] } } }
          ],
          as: 'users'
        }
      },
      {
        $facet: {
          results: [
            { $sort: { [`${sortField}`]: order } },
            { $skip: pageNo },
            { $limit: limit }
          ],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ])
  }

  async getById (id) {
    return Hospital.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: 'specialities',
          let: { id: '$speciality' },
          pipeline: [
            { $match: { $expr: { $and: { $in: ['$_id', '$$id'] } } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'speciality'
        }
      },
      {
        $lookup: {
          from: 'states',
          let: { id: '$state' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'state'
        }
      },
      {
        $unwind: { path: '$state', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'cities',
          let: { id: '$city' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1, stateId: 1 } }
          ],
          as: 'city'
        }
      },
      {
        $unwind: { path: '$city', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'areas',
          let: { id: '$area' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'area'
        }
      },
      {
        $unwind: { path: '$area', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'users',
          let: { id: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$hospitalId', '$$id'] } } }
          ],
          as: 'users'
        }
      }
    ])
  }

  async updateHospital (query, updateParams) {
    return Hospital.updateOne(query, updateParams).catch((e) => {
      errLogger.error({ method: 'Hospital-updateHospital', message: e.message })
    })
  }

  async deleteHospital (id, updateParams) {
    return Hospital.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Hospital-deleteHospital', message: e.message })
    })
  }

  async createDefaultCompliance (req) {
    const complianceServiceList = await ComplianceService.find({ status: STATUS.ACTIVE }).populate('complianceType').lean().catch((e) => {
      errLogger.error({ method: 'createComplianceList-service', message: e.message })
    })
    const params = []
    if (!_.isEmpty(complianceServiceList)) {
      complianceServiceList.forEach((data) => {
        if (!_.isEmpty(data.complianceType) && data.complianceType.status === 'ACTIVE' && data.status === 'ACTIVE') {
          params.push({
            hospitalId: req.user.hospitalId,
            ownedBy: req.user.id,
            type: data.complianceType,
            service: data._id,
            renewalCycle: data.duration
          })
          return params
        }
      })
    }

    return params
  }

  async getHospitalIds (query) {
    const hospitalQuery = Hospital.find()
    hospitalQuery.where({ status: STATUS.ACTIVE })

    if (query.selected_hospital) {
      hospitalQuery.where({ _id: { $in: query.selected_hospital } })
    }

    if (query.state) {
      hospitalQuery.where({ state: { $in: query.state } })
    }

    if (query.city) {
      hospitalQuery.where({ city: { $in: query.city } })
    }

    if (query.area) {
      hospitalQuery.where({ area: { $in: query.area } })
    }

    return hospitalQuery.select('_id').lean().catch((e) => {
      errLogger.error({ method: 'getHospitalIds', message: e.message })
    })
  }
}

const hospitalService = new Service()

module.exports = { Service, hospitalService }
