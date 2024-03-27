const path = require('path')
const fs = require('fs')
const AWS = require('aws-sdk')
const nodeMailer = require('nodemailer')
const ses = new AWS.SES({ region: process.env.SES_REGION })
const { EMAIL_TYPE } = require('../libs/constants')

function getEmailContent (type, toFind = [], toReplace = []) {
  const emailTemplatePath = path.join(__dirname, '../template/emails', `${type}.html`)
  let mailContent = fs.readFileSync(emailTemplatePath)
  mailContent = mailContent.toString()

  toFind.forEach((value, i) => {
    const regInput = new RegExp(value, 'g')
    mailContent = mailContent.replace(regInput, toReplace[i])
  })

  return mailContent
}

async function sendEmail (toEmail, type, data = {}) {
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.SES_ENABLED !== 'enabled'
  ) { return true }

  let subject, toFind, toReplace, mailContent

  switch (type) {
    case EMAIL_TYPE.REGISTRATION:
      subject = 'Registration email'
      toFind = ['FIRSTNAME', 'LASTNAME', 'EMAIL', 'MOBILE', 'PASSWORD']
      toReplace = [data.firstName, data.lastName, data.email, data.mobileNumber, data.password]
      mailContent = await getEmailContent(type, toFind, toReplace)
      break
    case EMAIL_TYPE.FORGOT_PASSWORD:
      subject = 'Forgot password email'
      mailContent = await getEmailContent(type)
      break
    default:
  }

  return sendMail(data, subject, mailContent)
}

function sendMail (emailTo, subject, mailContent) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      subject,
      html: mailContent,
      to: emailTo
    }
    if (process.env.ADMINBCC_EMAIL) {
      mailOptions.bcc = process.env.ADMINBCC_EMAIL
    }
    const transporter = nodeMailer.createTransport({
      SES: ses
    })

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(new Error({ sent: false, message: err.message }))
      } else {
        resolve({ sent: true, message: info.response })
      }
    })
  })
}

module.exports = { sendEmail }
