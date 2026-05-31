import { Router } from 'express'
import Feedback from '../models/Feedback.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// POST /api/feedback — public
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: '请填写姓名、邮箱和留言内容' })
    }
    const fb = await Feedback.create({ name, email, subject, message })
    res.status(201).json({ message: '感谢您的反馈！', id: fb._id })
  } catch (err) { next(err) }
})

// GET /api/feedback — admin
router.get('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 })
    res.json({ data: items })
  } catch (err) { next(err) }
})

export default router
