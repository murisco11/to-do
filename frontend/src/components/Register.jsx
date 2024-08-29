import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Messages from './Messages'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeated, setPasswordRepeated] = useState('')
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState([])

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/tasks/register', {
      email,
      password,
      password_repeated: passwordRepeated
    })
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          setSuccess([])
          setErrors([])
          setErrors(response.data.errors)
        } else if (response.data.success) {
          setSuccess([])
          setErrors([])
          setSuccess([response.data.success])
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error)
      })
  }

  const handleLogin = () => {
    navigate('/')
  }

  return (
    <>
      <Messages errors={errors} success={success} />
      <form onSubmit={handleRegister}>
        <h1>Registro</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Senha</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="password_repeated">Senha repetida</label>
        <input type="password" name="password_repeated" id="password_repeated" value={passwordRepeated} onChange={(e) => setPasswordRepeated(e.target.value)} />
        <button type="submit">Registrar-se</button>
        <button onClick={handleLogin}>Logar</button>
      </form>
    </>
  )
}

export default Register