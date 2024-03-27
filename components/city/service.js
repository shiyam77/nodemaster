const City = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createCity (params) {
    const data = new City(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'City-save', message: e.message })
    })
  }

  getCityAndCount (req) {
    const reqQuery = req.query

    const sortField = reqQuery && reqQuery.sort ? reqQuery.sort : 'name'
    const order = reqQuery && reqQuery.order && reqQuery.order === 'desc' ? -1 : 1
    const match = { $and: [] }

    if (reqQuery.status) {
      match.$and.push({ status: reqQuery.status })
    } else {
      match.$and.push({ status: 'ACTIVE' })
    }

    if (reqQuery.name) {
      match.$and.push({ name: { $regex: reqQuery.name, $options: 'i' } })
    }

    if (reqQuery.state) {
      match.$and.push({ 'stateId.name': { $regex: reqQuery.state, $options: 'i' } })
    }

    const pipeline = [
      {
        $lookup: {
          from: 'states',
          let: { id: '$stateId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { name: 1, status: 1 } }
          ],
          as: 'stateId'
        }
      },
      {
        $unwind: { path: '$stateId', preserveNullAndEmptyArrays: true }
      },
      { $project: { name: 1, stateId: 1, status: 1 } },
      {
        $match: match
      }
    ]

    const facetResult = []

    if (reqQuery.limit && reqQuery.page) {
      const limit = Number(
        reqQuery && reqQuery.limit ? reqQuery.limit : process.env.PAGE_LIMIT
      )
      const pageNo = Number(reqQuery && reqQuery.page ? limit * reqQuery.page - limit : 0)
      facetResult.push({ $sort: { [`${sortField}`]: order } },
        { $skip: pageNo },
        { $limit: limit })
    } else {
      facetResult.push({ $sort: { [`${sortField}`]: order } })
    }

    pipeline.push({
      $facet: {
        results: facetResult,
        totalCount: [
          {
            $count: 'count'
          }
        ]
      }
    })

    return City.aggregate(pipeline)
  }

  async getAll () {
    return City.find()
      .populate({
        path: 'stateId',
        select: 'name'
      })
      .select('name status stateId')
      .sort({ createdAt: -1 }).lean().catch((e) => {
        errLogger.error({ method: 'City-getAll', message: e.message })
      })
  }

  async getById (id) {
    return City.findById(id)
      .populate({
        path: 'stateId',
        select: 'name'
      })
      .select('name status stateId')
      .lean().catch((e) => {
        errLogger.error({ method: 'City-getById', message: e.message })
      })
  }

  async updateCity (id, updateParams) {
    return City.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'City-getById', message: e.message })
    })
  }

  async deleteCity (id, updateParams) {
    return City.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'City-getById', message: e.message })
    })
  }
}

const cityService = new Service()

module.exports = { Service, cityService }
