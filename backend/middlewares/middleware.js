const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'] || req.query.token

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido, acesso negado.' })
  }

  jwt.verify(token, 'mauricio-secret', (err, decoded) => {
    if (err) {
      console.log('erro no token')
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado, faça login novamente.' })
      }
      return res.status(401).json({ error: 'Token inválido, acesso negado.' })
    }
    req.user = decoded
    next()
  })
}
