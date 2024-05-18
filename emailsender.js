
const sgMail = require('@sendgrid/mail')
const API_KEY = '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'
sgMail.setApiKey(API_KEY)
async function sendEmail(email,code){
    const msg = {
        to: email, // Change to your recipient
        from: 'denis11192@gmail.com', // Change to your verified sender
        subject: 'OTP Code',
        text: 'Your OTP code is:' + code,
        html: '<strong>Your OTP code is: </strong>'+ code,
      }
      await sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}


module.exports = sendEmail; 
