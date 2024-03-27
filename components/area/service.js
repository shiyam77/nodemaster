const Area = require('./schema')
const { errLogger } = require('../../config/logger')

class Service {
  async createArea (params) {
    const data = new Area(params)
    return data.save().catch((e) => {
      errLogger.error({ method: 'Area-save', message: e.message })
    })
  }

  getAreaAndCount (req) {
    const reqQuery = req.query
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

    if (reqQuery.city) {
      match.$and.push({ 'cityId.name': { $regex: reqQuery.city, $options: 'i' } })
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
      {
        $lookup: {
          from: 'cities',
          let: { id: '$cityId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { name: 1, status: 1, stateId: 1 } },
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
            }
          ],
          as: 'cityId'
        }
      },
      {
        $unwind: { path: '$cityId', preserveNullAndEmptyArrays: true }
      },
      { $project: { name: 1, stateId: 1, cityId: 1, status: 1 } },
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

    return Area.aggregate(pipeline)
  }

  async getAll () {
    return Area.find()
      .populate({
        path: 'stateId',
        select: 'name'
      })
      .populate({
        path: 'cityId',
        select: 'name stateId',
        populate: {
          path: 'stateId',
          select: 'name'
        }
      })
      .select('name status stateId cityId')
      .sort({ createdAt: -1 }).lean().catch((e) => {
        errLogger.error({ method: 'Area-getAll', message: e.message })
      })
  }

  async getById (id) {
    return Area.findById(id)
      .populate({
        path: 'stateId',
        select: 'name'
      })
      .populate({
        path: 'cityId',
        select: 'name stateId',
        populate: {
          path: 'stateId',
          select: 'name'
        }
      })
      .select('name status stateId cityId')
      .lean().catch((e) => {
        errLogger.error({ method: 'Area-getById', message: e.message })
      })
  }

  async updateArea (id, updateParams) {
    return Area.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Area-getById', message: e.message })
    })
  }

  async deleteArea (id, updateParams) {
    return Area.updateOne(id, updateParams).catch((e) => {
      errLogger.error({ method: 'Area-getById', message: e.message })
    })
  }
}

const areaService = new Service()

module.exports = { Service, areaService }
