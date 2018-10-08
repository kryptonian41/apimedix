const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apemedic')

router.get('/api/symptoms', apiController.getSymptoms)
router.get('/api/diagnosis', apiController.getSymptoms)

module.exports = router
