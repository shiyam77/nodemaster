const joi = require('@hapi/joi')

const create = joi.object().keys({
  android: joi.object().keys({
    versionCode: joi.number().required(),
    isUpdateAvailable: joi.string().required(),
    isForceUpdate: joi.string().required(),
    playStoreLink: joi.string().required(),
    versionAlertTitle: joi.string().required(),
    versionAlertContent: joi.string().required(),
    storeMarketId: joi.string().required()
  }),
  ios: joi.object().keys({
    versionCode: joi.number().required(),
    isUpdateAvailable: joi.string().required(),
    isForceUpdate: joi.string().required(),
    appStoreLink: joi.string().required(),
    versionAlertTitle: joi.string().required(),
    versionAlertContent: joi.string().required(),
    storeMarketId: joi.string().required()
  }),
  resendOtpTimer: joi.number(),
  validityPeriod: joi.number(),
  supportContact: joi.number(),
  lang: joi.object().keys({
    en_us: joi.string().allow('', null),
    ta_in: joi.string().allow('', null)
  })
})

const list = joi.object().keys()

const read = joi.object().keys()

const update = joi.object().keys({
  android: joi.object().keys({
    versionCode: joi.number(),
    isUpdateAvailable: joi.string(),
    isForceUpdate: joi.string(),
    playStoreLink: joi.string(),
    versionAlertTitle: joi.string(),
    versionAlertContent: joi.string(),
    storeMarketId: joi.string()
  }),
  ios: joi.object().keys({
    versionCode: joi.number(),
    isUpdateAvailable: joi.string(),
    isForceUpdate: joi.string(),
    appStoreLink: joi.string(),
    versionAlertTitle: joi.string(),
    versionAlertContent: joi.string(),
    storeMarketId: joi.string()
  }),
  resendOtpTimer: joi.number(),
  validityPeriod: joi.number(),
  supportContact: joi.number(),
  lang: joi.object().keys({
    en_us: joi.string().allow('', null),
    ta_in: joi.string().allow('', null)
  })
})

const checkVersion = joi.object().keys()

const area = joi.object().keys()

module.exports = {
  create,
  list,
  read,
  update,
  checkVersion,
  area
}
