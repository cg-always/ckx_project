import { Router } from 'express'
import Checklist from '../models/Checklist.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/checklists — user's saved checklists
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const items = await Checklist.find({ user: req.user._id }).sort({ updatedAt: -1 })
    res.json({ data: items })
  } catch (err) { next(err) }
})

// GET /api/checklists/:id
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const item = await Checklist.findOne({ _id: req.params.id, user: req.user._id })
    if (!item) return res.status(404).json({ error: '清单未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// POST /api/checklists
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, scale, types, tasks } = req.body
    const item = await Checklist.create({
      user: req.user._id,
      name: name || 'My Checklist',
      scale, types, tasks
    })
    res.status(201).json(item)
  } catch (err) { next(err) }
})

// PUT /api/checklists/:id
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const update = { ...req.body, updatedAt: new Date() }
    const item = await Checklist.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      update,
      { new: true }
    )
    if (!item) return res.status(404).json({ error: '清单未找到' })
    res.json(item)
  } catch (err) { next(err) }
})

// DELETE /api/checklists/:id
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await Checklist.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    res.json({ message: '已删除' })
  } catch (err) { next(err) }
})

export default router
