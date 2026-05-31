import mongoose from 'mongoose'

const checklistSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, default: 'My Checklist' },
  scale:   { type: String, enum: ['small','medium','large'], required: true },
  types:   [{ type: String }],
  tasks:   [{
    id:    String,
    text:  String,
    done:  { type: Boolean, default: false },
    phase: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Checklist', checklistSchema)
