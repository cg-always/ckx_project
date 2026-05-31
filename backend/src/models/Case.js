import mongoose from 'mongoose'

const caseSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  titleEn:    { type: String, default: '' },
  type:       { type: String, enum: ['positive','negative','boundary'], required: true },
  badge:      { type: String },
  badgeBg:    { type: String },
  badgeColor: { type: String },
  summary:    { type: String, required: true },
  background: { type: String },
  details:    { type: String },
  outcome:    { type: String },
  lessons:    [{ type: String }],
  relatedCompliance: [{ type: String }],
  createdAt:  { type: Date, default: Date.now }
})

export default mongoose.model('Case', caseSchema)
