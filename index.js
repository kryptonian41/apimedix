const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config')
const CryptoJS = require('crypto-js')
const router = express.Router()
const axios = require('axios')
const mongoose = require('mongoose')
const { getSymptoms } = require('./controllers/apemedic')

// note: Establishing connection with the Database
mongoose.connect(config.keys.mongoose_url)
require('./database/diseaseInfo')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/dist'))

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.listen(config.PORT, function() {
  console.log('Server started')
  console.info('Getting and setting the auth token')
  // getting the auth token
  const {
    apimedic__username: username,
    apimedic__password: password
  } = config.keys
  const uri = 'https://sandbox-authservice.priaid.ch/login'
  const computedHash = CryptoJS.HmacMD5(uri, password)
  const computedHashString = computedHash.toString(CryptoJS.enc.Base64)
  axios({
    url: uri,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + username + ':' + computedHashString
    }
  })
    .then(({ data: { Token } }) => {
      app.locals.key = Token
    })
    .catch(data => {
      console.log('error', data)
    })
})
