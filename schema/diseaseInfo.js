const mongoose = require('mongoose')
const { Schema } = mongoose

const diseaseSchema = new Schema({
  title: String,
  id: Number,
  symptoms: String,
  medications: String,
  treatement: String,
  specialists: String,
  selfCare: String,
  description: String
})

mongoose.model('diseases', diseaseSchema)
