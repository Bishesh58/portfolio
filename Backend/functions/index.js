const functions = require('firebase-functions')

const sgMail = require('@sendgrid/mail')
const moment = require('moment')
const admin = require('firebase-admin')

admin.initializeApp()
const cors = require('cors')({ origin: true })

const SENDGRID_API_KEY = functions.config().sendgrid.key
const SENDGRID_TEMP = functions.config().sendgrid.temp
sgMail.setApiKey(SENDGRID_API_KEY)

exports.contactEmail = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed',
      })
    }
    try {
      const date = new Date()
      const timestamp = moment(date)
        .utcOffset('+12')
        .format('DD/MM/YYYY hh:mm A')
      const msg = {
        to: 'bishesh.sunam@gmail.com',
        from: 'bishesh.sunam@gmail.com',
        templateId: SENDGRID_TEMP,
        dynamic_template_data: {
          timestamp: timestamp,
          userName: req.body.name,
          userEmail: req.body.email,
          message: req.body.message,
        },
      }

      await sgMail.send(msg)

      res.status(200).json({ message: 'success' })
    } catch (error) {
      const code = error.code
      const message = error.message
      const details = error.details
      return console.log(
        `"code:"${code}, "message": $${message}, "details": ${details}`
      )
    }
  })
})
