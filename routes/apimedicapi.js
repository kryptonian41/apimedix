const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apemedic')

router.get('/symptoms', (req, res) => {
  apiController.getSymptoms(req).then(data => {
    res.send(data)
  })
})
router.post('/diagnosis', (req, res) => {
  apiController.getDiagnosis(req).then(data => {
    res.send(data)
  })
})

router.get('/test', (req, res) => {
  res.send('success')
})

module.exports = router
