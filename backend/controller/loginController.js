const Login = require('../models/loginModel.js')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if (login.errors.length > 0) {
      res.json({ errors: login.errors })
      return
    }
    const token = jwt.sign({ id: login.user._id }, 'mauricio-secret', { expiresIn: '1h' })

    res.json({
      success: "Login realizado com sucesso",
      user: login.user,
      token: token
    })
  }
  catch (e) {
    console.log(e)
  }
}

exports.cadastro = async (req, res, next) => {
  try {
    const cadastro = new Login(req.body)
    await cadastro.registro()

    if (cadastro.errors.length > 0) {
      res.json({ errors: cadastro.errors })
      return
    }

    res.json({
      success: 'Seu usuário foi registrado com sucesso!'
    })
  }
  catch (e) {
    console.log(e)
  }
}

exports.deletar_conta = async (req, res, next) => {
  try {
    const deletar = new Login(req.body)
    await deletar.deletar_conta()

    if (deletar.errors.length > 0) {
      res.json({ errors: deletar.errors })
      return
    }

    res.json({
      success: 'Seu usuário foi deletado com sucesso!'
    })

  } catch (e) {
    console.log(e)
  }
}

exports.trocar_senha = async (req, res, next) => {
  try {
    const troca = new Login(req.body)
    await troca.troca_senha()

    if (troca.errors.length > 0) {
      res.json({ errors: troca.errors })
      return
    }

    res.json({ success: 'Sua conta foi alterada com sucesso!' })
  } catch (e) {
    console.log(e)
  }
}