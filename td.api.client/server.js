const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const sendEmail = require('./mailer');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors({
  origin: ['https://www.testdrivelivetv.com', 'http://www.testdrivelivetv.com', 'www.testdrivelivetv.com', 'testdrivelivetv.com', 'td-frontend-client-test-drive-live-devs.vercel.app']
}));

app.get("/api/home", (req, res) => {
  res.json({ message: "This is the 'home' API endpoint, there is nothing else to see here..."});
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


app.use(bodyParser.json());

app.post('/api/email', (req, res) => {
    console.log(req.body);
    console.log("Email with SMTP host: " + process.env.SMTP_HOST);
    sendEmail(req.body, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent');
      }
    });
  });


  const codes = ['1234', 'SignalSpectrum', 'PixelPulse', 'WaveformWindow', 'ScreenSweep', 'BroadcastBlink', 'cigar'];

  // Mock function that returns a user object based on the code
  // To do: Change logic to generate the user object
  const getUserByCode = (code) => {
    return {
      id: code,
      name: `User ${code}`,
      email: `${code}@freecast.com`
    }
  }
  
  // Endpoint that verifies the code and returns the user object or an error
  app.post('/api/codes', (req, res) => {
    const { code } = req.body
    if (codes.includes(code)) {
      const user = getUserByCode(code)
      res.json({ user })
    } else {
      res.status(401).json({ error: 'Invalid code' })
    }
  })
