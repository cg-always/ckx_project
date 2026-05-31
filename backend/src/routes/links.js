import { Router } from 'express'
import Link from '../models/Link.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/links — public
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query
    const filter = category && category !== 'all' ? { category } : {}
    const items = await Link.find(filter).sort({ createdAt: 1 })
    res.json({ data: items })
  } catch (err) { next(err) }
})

// POST /api/links — admin
router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Link.create(req.body)
    res.status(201).json(item)
  } catch (err) { next(err) }
})

// PUT /api/links/:id — admin
router.put('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!item) return res.status(404).json({ error: '链接未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// DELETE /api/links/:id — admin
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await Link.findByIdAndDelete(req.params.id)
    res.json({ message: '已删除' })
  } catch (err) { next(err) }
})

export default router
