const axios = require('axios')
const mongoose = require('mongoose')
const Disease = mongoose.model('diseases')
// for web scrapping
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

// apimedic api URL
const hostUrl = 'https://sandbox-healthservice.priaid.ch'
// google search page host url
const googleSearchURL = 'https://www.google.co.in/search?q='

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

const scrapeDiseaseData = key => {
  // todo: implement data scrapping from google search page
  return puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage()
    })
    .then(function(page) {
      return page.goto(googleSearchURL + key).then(function() {
        return page.content()
      })
    })
    .then(function(html) {
      const $ = cheerio.load(html)
      console.log(html)
      const accordians = $('#knowledge-health__hitf')
      console.log('TCL: containers', accordians)
    })
    .catch(function(err) {
      console.log(err)
    })
}

// get disease data from the database and if not present then fetch the data from the api or scrape the web
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
          description: data.Description,
          treatement: data.TreatmentDescription,
          symptoms: data.PossibleSymptoms
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
  getDiseaseData,
  scrapeDiseaseData
}
