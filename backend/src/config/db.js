import mongoose from 'mongoose'

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/uk-cny-compliance'
    await mongoose.connect(uri)
    console.log('[DB] MongoDB connected:', uri)
  } catch (err) {
    console.error('[DB] Connection error:', err.message)
    process.exit(1)
  }
}
