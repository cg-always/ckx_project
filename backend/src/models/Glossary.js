import mongoose from 'mongoose'

const glossarySchema = new mongoose.Schema({
  en:        { type: String, required: true, unique: true },
  cn:        { type: String, required: true },
  definition:{ type: String, required: true },
  law:       { type: String, default: '' },
  category:  { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now }
})

glossarySchema.index({ en: 'text', cn: 'text', definition: 'text' })

export default mongoose.model('Glossary', glossarySchema)
