const axios = require('axios')
const cheerio = require('cheerio')

const hostUrl = 'https://sandbox-healthservice.priaid.ch'
// host website for colleecting data on different diseases
const scrapeHost = 'https://medlineplus.gov'
const scrapeSearchHost =
  'https://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&v%3Asources=medlineplus-bundle&query='
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
  })
    .then(res => res.data)
    .catch(err => err)
}

// get diagnosis according to the recieved symptoms
const getDiagnosis = req => {
  const {
    body: { symptoms },
    app: { locals }
  } = req
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

const scrapeDiseaseData = () => {
  // todo: implement data scrapping
}

module.exports = {
  getSymptoms,
  getDiagnosis
}
