import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Messages from './Messages'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.post('http://localhost:5000/tasks/verify_token', {}, {
        headers: { 'x-access-token': token }
      })
        .then(response => {
          if (response.data.success) {
            navigate('/tasks')
          }
        })
        .catch(error => {
          console.error('Erro ao verificar o token:', error)
          localStorage.removeItem('token')
        })
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/tasks/login', { email, password })
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          setErrors(response.data.errors)
          setSuccess('')
        } else {
          setSuccess(response.data.success)
          setErrors([])
          localStorage.setItem('email', response.data.user.email)
          localStorage.setItem('token', response.data.token)
          navigate('/tasks')
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error)
        setErrors(['Erro na requisição. Por favor, tente novamente mais tarde.'])
        setSuccess('')
      })
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleTrocarSenha = () => {
    navigate('/trocar_senha')
  }

  return (
    <form onSubmit={handleLogin}>
      <Messages errors={errors} success={success} />
      <h1>Login</h1>
      <div className='form-div'>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-div'>
        <label htmlFor="password">Senha</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Logar</button>
      <button type="button" onClick={handleRegister}>Registrar</button>
      <button type="button" onClick={handleTrocarSenha}>Trocar Senha</button>
    </form>
  )
}

export default Login