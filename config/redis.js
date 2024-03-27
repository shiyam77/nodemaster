const redis = require('redis')

const client = redis.createClient(process.env.REDIS_URI)

const asyncRedis = require('async-redis')
const redisClient = asyncRedis.decorate(client)

redisClient.on('connect', function () {
  console.log('Redis DB connected')
})

redisClient.on('error', function (error) {
  console.error(error)
})

module.exports = redisClient
