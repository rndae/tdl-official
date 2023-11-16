const nodemailer = require('nodemailer');

function sendEmail(data, callback) {
  let transporter = nodemailer.createTransport({
    
    service: "Outlook365",
    auth: {
       user: process.env.SMTP_LOGIN,
       pass: process.env.SMTP_KEY
    },

  });

  
  let table = '<table style="border: 1px solid black; border-collapse: collapse;">';
  for (let key in data) {
    table += `<tr><td style="border: 1px solid black; padding: 10px;">${key}</td><td style="border: 1px solid black; padding: 10px;">${data[key]}</td></tr>`;
  }
  table += '</table>';

  let mailOptions = {
    from: process.env.SMTP_EMAIL_ADDRESS, 
    to: process.env.SMTP_EMAIL_ADDRESS + ", rvena@freecast.com",
    subject: 'TestDriveLive - Testing Internal Form Submission',
    html: `<p>Client details to fill contract:</p>${table}`
  };

  transporter.sendMail(mailOptions, callback);
}

module.exports = sendEmail;
