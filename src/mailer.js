
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    refreshToken:   process.env.GMAIL_RFRESHTOKEN,
    accessToken:    process.env.GMAIL_ACCESSTOKEN,
    clientId:       process.env.GMAIL_CLIENTID,
    clientSecret:   process.env.GMAIL_CLIENTSECRET
  }
})

const send = ({ email, name, text }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from,
    to: 'anastasia.yesiam@gmail.com',
    subject: `New message from ${from}`,
    text,
    replyTo: from
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send