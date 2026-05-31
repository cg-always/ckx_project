import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'

import authRoutes      from './routes/auth.js'
import glossaryRoutes  from './routes/glossary.js'
import casesRoutes     from './routes/cases.js'
import linksRoutes     from './routes/links.js'
import templatesRoutes from './routes/templates.js'
import feedbackRoutes  from './routes/feedback.js'
import checklistRoutes from './routes/checklist.js'
import adminRoutes     from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }))
app.use(express.json({ limit: '10mb' }))

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: '请求过于频繁，请稍后再试' }
}))

// Routes
app.use('/api/auth',      authRoutes)
app.use('/api/glossary',  glossaryRoutes)
app.use('/api/cases',     casesRoutes)
app.use('/api/links',     linksRoutes)
app.use('/api/templates', templatesRoutes)
app.use('/api/feedback',  feedbackRoutes)
app.use('/api/checklists',checklistRoutes)
app.use('/api/admin',     adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handler
app.use(errorHandler)

// Start
async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`[Server] API running at http://localhost:${PORT}`)
  })
}

start()
