const axios = require('axios')
const hostUrl = 'https://sandbox-healthservice.priaid.ch'
const apimedic = axios.create({
  baseURL: hostUrl,
  params: {
    language: 'en-gb'
  }
})

// get all symptoms
const getSymptoms = req => {
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
const getDiagnosis = req => {
  const {
    body: { symptoms },
    app: { locals }
  } = req
  console.log(symptoms)
  return apimedic('/diagnosis', {
    params: {
      token: locals.key,
      symptoms: JSON.stringify(symptoms),
      gender: 'male',
      year_of_birth: 1997
    }
  })
    .then(res => res.data)
    .catch(err => console.log(err))
}

module.exports = {
  getSymptoms,
  getDiagnosis
}
