const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const mkdirp = require('mkdirp')
const { ALLOWED_MIME_TYPE, ERR_FILE_TYPE } = require('../libs/constants')

const uploadStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const type = req.body.type.toLowerCase()
    const hospitalId = req.user.hospitalId
    const userId = req.user.id
    let prefix = `uploads/${type}`
    if (type === 'profile') {
      prefix = `uploads/${type}/${hospitalId}/${userId}`
    } else if (type === 'compliance') {
      prefix = `uploads/${type}/${hospitalId}/compliance`
    }

    await mkdirp(prefix)
    cb(null, prefix)
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.type.toLowerCase()}-${uuidv4()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`)
  }
})

const uploads = multer({
  storage: uploadStorage,
  limits: { fileSize: `${process.env.MAX_UPLOAD_SIZE_MB}` * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (_.includes(ALLOWED_MIME_TYPE, file.mimetype) === false) {
      cb(new Error(ERR_FILE_TYPE))
    } else {
      cb(null, true)
    }
  }
}).array('file_to_upload', 5)

module.exports = {
  uploads
}
