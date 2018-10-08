const axios = require('axios')
const hostUrl = 'https://sandbox-healthservice.priaid.ch'
const apimedic = axios.create({
  baseURL: hostUrl,
  params: {
    language: 'en-gb'
  }
})

// get all symptoms
const getSymptoms = (req, res) => {
  const {
    app: { locals }
  } = req
  return apimedic(`/symptoms`, {
    params: {
      token: locals.key
    }
  }).then(res => res.data)
}

// get diagnosis according to the recieved symptoms
const getDiagnosis = (req, res) => {
  const {
    body: { symptoms },
    app: { locals }
  } = req

  return apimedic('/diagnosis', {
    params: {
      token: locals.key
    }
  }).then(res => res.data)
}

module.exports = {
  getSymptoms,
  getDiagnosis
}
