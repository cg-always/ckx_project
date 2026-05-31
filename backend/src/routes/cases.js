import { Router } from 'express'
import Case from '../models/Case.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/cases — public
router.get('/', async (req, res, next) => {
  try {
    const items = await Case.find().sort({ createdAt: 1 })
    res.json({ data: items })
  } catch (err) { next(err) }
})

// GET /api/cases/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Case.findById(req.params.id)
    if (!item) return res.status(404).json({ error: '案例未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// POST /api/cases — admin
router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Case.create(req.body)
    res.status(201).json(item)
  } catch (err) { next(err) }
})

// PUT /api/cases/:id — admin
router.put('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!item) return res.status(404).json({ error: '案例未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// DELETE /api/cases/:id — admin
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await Case.findByIdAndDelete(req.params.id)
    res.json({ message: '已删除' })
  } catch (err) { next(err) }
})

export default router
