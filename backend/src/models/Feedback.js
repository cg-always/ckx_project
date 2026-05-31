import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  replied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Feedback', feedbackSchema)
