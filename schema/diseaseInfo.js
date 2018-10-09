const mongoose = require('mongoose')
const { Schema } = mongoose

const diseaseSchema = new Schema({
  title: String,
  symptoms: String,
  id: Number,
  selfCare: String,
  medications: String,
  medicalProcedure: String,
  specialists: String
})

mongoose.model('diseases', diseaseSchema)
