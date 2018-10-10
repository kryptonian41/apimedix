const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Disease = mongoose.model('diseases')

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
    .catch(err => err)
}

const scrapeDiseaseData = () => {
  // todo: implement data scrapping
}

const getDiseaseData = req => {
  const {
    params: { id },
    app: { locals }
  } = req

  return Disease.findOne({ id }).then(res => {
    if (res) {
      return res
    }
    return apimedic(`/issues/${id}/info`, {
      params: {
        token: locals.key,
        issue_id: id
      }
    })
      .then(async ({ data }) => {
        const artdata = {
          title: data.Name,
          id,
          medicalProcedure: data.TreatmentDescription,
          description: data.Description
        }
        const disease = new Disease(artdata)
        await disease.save()
        return artdata
      })
      .catch(err => console.log(err))
  })
}

module.exports = {
  getSymptoms,
  getDiagnosis,
  getDiseaseData
}
