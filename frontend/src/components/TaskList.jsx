import React, { useEffect, useState } from 'react'
import withAuth from './WithAuth'
import DeleteOrDeslog from './DeleteOrDeslog'
import axios from 'axios'
import LiTask from './LiTask'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState([])
  const [tarefas, setTarefas] = useState([])

  const email = localStorage.getItem('email')

  const handleCadastrar = () => {
    navigate('/add/task')
  }

  const updateTarefas = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:5000/tasks/tarefas', {
        headers: { 'x-access-token': token },
        params: { email }
      })

      if (response.data.errors && response.data.errors.length > 0) {
        setErrors(response.data.errors)
        setSuccess([])
      } else {
        setSuccess([response.data.success])
        setTarefas(response.data.tarefas)
        setErrors([])
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      setErrors(['Erro na requisição. Por favor, tente novamente mais tarde.'])
      setSuccess([])
    }
  }

  useEffect(() => {
    updateTarefas()
  }, [])

  return (
    <>
      <h2 id='user'>Logado em: {email}</h2>
      <ul id='listToDo'>
        <LiTask tarefas={tarefas} onUpdateTarefas={updateTarefas} />
      </ul>
      <button onClick={handleCadastrar}>Cadastrar tarefa</button>
      <DeleteOrDeslog />
    </>
  )
}

export default withAuth(TaskList)