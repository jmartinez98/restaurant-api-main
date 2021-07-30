const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    res.status(401).json({ msg: 'No se envio un token' })
    return
  }

  try {
    const tokenSeparado = token.split('Bearer ')
    const verificarToken = jwt.verify(tokenSeparado[1], process.env.TOKEN)
    req.logueado = verificarToken.usuario
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token no valido o expirado' })
  }
}
