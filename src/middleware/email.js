const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
})

module.exports = (emailClient, subject, url, name) => {
  const mailOption = {
    from: process.env.EMAIL_NAME,
    to: emailClient,
    subject: `${subject} is your otp`,
    text: `hello ${name}, ${subject} is your otp, please input in form ${url}`
  }

  transporter.sendMail(mailOption, function (error, data) {
    if (error) {
      console.log('error: ', error)
      return 'email not send'
    } else {
      console.log('email send')
      console.log(data)
      return 'email success'
    }
  })
}
