const Interest = require('./schema')
const { errLogger } = require('../../config/logger')
const { STATUS } = require('../../libs/constants')

class Service {
  async createInterest (params) {
    const data = new Interest(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'Interest-save', message: e.message })
    })
  }

  getInterestAndCount (req) {
    const reqQuery = req.query
    const limit = Number(
      reqQuery && reqQuery.limit ? reqQuery.limit : process.env.PAGE_LIMIT
    )
    const pageNo = Number(reqQuery && reqQuery.page ? limit * reqQuery.page - limit : 0)
    const sortField = reqQuery && reqQuery.sort ? reqQuery.sort : 'createdAt'
    const order = reqQuery && reqQuery.order && reqQuery.order === 'asc' ? 1 : -1
    const match = { $and: [] }

    if (reqQuery.status) {
      match.$and.push({ status: reqQuery.status })
    } else {
      match.$and.push({ status: 'ACTIVE' })
    }

    if (reqQuery.name) {
      match.$and.push({ name: { $regex: reqQuery.name, $options: 'i' } })
    }

    if (reqQuery.email) {
      match.$and.push({ email: { $regex: reqQuery.email, $options: 'i' } })
    }

    if (reqQuery.mobileNumber) {
      match.$and.push({ mobileNumber: { $regex: reqQuery.mobileNumber, $options: 'i' } })
    }

    return Interest.aggregate([
      {
        $match: match
      },
      { $project: { name: 1, email: 1, mobileNumber: 1, createdAt: 1, status: 1 } },
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
    return Interest.findById(id)
      .select('name mobileNumber email createdAt status')
      .lean().catch((e) => {
        errLogger.error({ method: 'Interest-getById', message: e.message })
      })
  }

  async updateInterest (id, updateParams) {
    return Interest.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Interest-getById', message: e.message })
    })
  }

  async deleteInterest (id, updateParams) {
    return Interest.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Interest-getById', message: e.message })
    })
  }

  async isMobileNumberAlreadyExist (mobileNumber, id = '') {
    const query = Interest.where({ mobileNumber: mobileNumber, status: { $ne: STATUS.DELETE } })
    if (id) {
      query.where({ _id: { $ne: id } })
    }

    return query.countDocuments().catch((e) => {
      errLogger.error({ method: 'users-isMobileNumberAlreadyExist', message: e.message })
    })
  }
}

const stateService = new Service()

module.exports = { Service, stateService }
