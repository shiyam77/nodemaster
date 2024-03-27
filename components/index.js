const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
// GET /health - Check service health
router.get('/health', (req, res) => res.send('API server running'))

fs.readdir(__dirname, function (err, components) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  components.forEach(function (component) {
    try {
      if (fs.existsSync(`${__dirname}/${component}/router.js`)) {
        router.use(`${process.env.BASEPATH}/${component}`.toLowerCase(), require(path.join(__dirname, component, 'router.js')))
      }
    } catch (e) {
      console.log('error', e)
    }
  })
})

module.exports = router
