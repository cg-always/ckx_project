import { Router } from 'express'
import Glossary from '../models/Glossary.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/glossary — public
router.get('/', async (req, res, next) => {
  try {
    const { search, category } = req.query
    const filter = {}
    if (category && category !== 'all') filter.category = category
    if (search) filter.$text = { $search: search }

    const items = search
      ? await Glossary.find(filter, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } })
      : await Glossary.find(filter).sort({ createdAt: 1 })

    res.json({ data: items, total: items.length })
  } catch (err) { next(err) }
})

// GET /api/glossary/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Glossary.findById(req.params.id)
    if (!item) return res.status(404).json({ error: '术语未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// POST /api/glossary — admin
router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Glossary.create(req.body)
    res.status(201).json(item)
  } catch (err) { next(err) }
})

// PUT /api/glossary/:id — admin
router.put('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Glossary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!item) return res.status(404).json({ error: '术语未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// DELETE /api/glossary/:id — admin
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Glossary.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: '术语未找到' })
    res.json({ message: '已删除' })
  } catch (err) { next(err) }
})

export default router
