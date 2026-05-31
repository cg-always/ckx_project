import { Router } from 'express'
import User from '../models/User.js'
import { generateToken, requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ error: '请填写所有必填字段' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: '密码至少6位' })
    }
    const exists = await User.findOne({ $or: [{ email }, { username }] })
    if (exists) {
      return res.status(409).json({ error: '用户名或邮箱已被注册' })
    }
    const user = await User.create({ username, email, password })
    const token = generateToken(user._id)
    res.status(201).json({ token, user: user.toJSON() })
  } catch (err) { next(err) }
})

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: '请输入邮箱和密码' })
    }
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: '邮箱或密码错误' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ error: '邮箱或密码错误' })

    const token = generateToken(user._id)
    res.json({ token, user: user.toJSON() })
  } catch (err) { next(err) }
})

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  res.json({ user: req.user })
})

export default router
