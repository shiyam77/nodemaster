class QueryBuilder {
  static pagination (reqData, query) {
    const pageNo = reqData.page ? reqData.page : 1
    const limit = reqData.limit ? reqData.limit : process.env.PAGE_LIMIT
    const skip = (pageNo - 1) * limit
    query.limit(Number(limit))
    query.skip(skip)

    return query
  }
}

module.exports = QueryBuilder
