const State = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createState (params) {
    const data = new State(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'State-save', message: e.message })
    })
  }

  getStateAndCount (req) {
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

    const pipeline = [
      {
        $match: match
      },
      { $project: { name: 1, status: 1 } }
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

    return State.aggregate(pipeline)
  }

  async getAll () {
    return State.find()
      .select('name status')
      .sort({ createdAt: -1 }).lean().catch((e) => {
        errLogger.error({ method: 'State-getAll', message: e.message })
      })
  }

  async getById (id) {
    return State.findById(id)
      .select('name status')
      .lean().catch((e) => {
        errLogger.error({ method: 'State-getById', message: e.message })
      })
  }

  async updateState (id, updateParams) {
    return State.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'State-getById', message: e.message })
    })
  }

  async deleteState (id, updateParams) {
    return State.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'State-getById', message: e.message })
    })
  }
}

const stateService = new Service()

module.exports = { Service, stateService }
