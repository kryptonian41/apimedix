const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config')
const CryptoJS = require('crypto-js')
const axios = require('axios')
const mongoose = require('mongoose')
const path = require('path')

// note: Establishing connection with the Database
mongoose.connect(
  config.keys.mongoose_url,
  { useNewUrlParser: true }
)
mongoose.Promise = Promise
require('./schema/diseaseInfo')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', require('./routes/apimedicapi'))

app.use(express.static('client/dist'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

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
