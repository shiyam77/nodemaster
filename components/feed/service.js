const Feed = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createFeed (params) {
    const data = new Feed(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'Feed-save', message: e.message })
    })
  }

  getFeedsAndCount (req) {
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

    if (reqQuery.s) {
      match.$and.push({ $text: { $search: reqQuery.s.trim() } })
    }

    return Feed.aggregate([
      {
        $match: match
      },
      { $project: { title: 1, description: 1, image: 1, video: 1, status: 1, createdAt: 1 } },
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

  async getAll () {
    return Feed.find().sort({ createdAt: -1 }).lean().catch((e) => {
      errLogger.error({ method: 'Feed-getAll', message: e.message })
    })
  }

  async getById (id) {
    return Feed.findById(id).lean().catch((e) => {
      errLogger.error({ method: 'Feed-getById', message: e.message })
    })
  }

  async updateFeed (id, updateParams) {
    return Feed.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Feed-getById', message: e.message })
    })
  }

  async deleteFeed (id, updateParams) {
    return Feed.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Feed-getById', message: e.message })
    })
  }
}

const feedService = new Service()

module.exports = { Service, feedService }
