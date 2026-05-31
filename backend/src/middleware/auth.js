import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: '未提供认证令牌' })
    }
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) return res.status(401).json({ error: '用户不存在' })
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: '令牌无效或已过期' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: '需要管理员权限' })
  }
  next()
}
