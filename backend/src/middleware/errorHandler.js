export function errorHandler(err, req, res, _next) {
  console.error('[Error]', err.message)

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ error: '验证失败', details: messages })
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: '记录已存在' })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: '无效ID格式' })
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? '服务器内部错误'
      : err.message
  })
}
