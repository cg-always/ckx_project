import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  url:         { type: String, required: true },
  description: { type: String },
  category:    { type: String, required: true, index: true },
  iconBg:      { type: String },
  iconColor:   { type: String },
  createdAt:   { type: Date, default: Date.now }
})

export default mongoose.model('Link', linkSchema)
