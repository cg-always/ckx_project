import { Router } from 'express'
import Glossary from '../models/Glossary.js'
import Case from '../models/Case.js'
import Link from '../models/Link.js'
import Feedback from '../models/Feedback.js'
import User from '../models/User.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/admin/stats
router.get('/stats', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const [glossary, cases, links, feedback, users] = await Promise.all([
      Glossary.countDocuments(),
      Case.countDocuments(),
      Link.countDocuments(),
      Feedback.countDocuments(),
      User.countDocuments()
    ])
    res.json({ glossary, cases, links, feedback, users })
  } catch (err) { next(err) }
})

// GET /api/admin/users
router.get('/users', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ data: users })
  } catch (err) { next(err) }
})

export default router
