import withAuth from './WithAuth'
import Messages from "./Messages"
import React, { useState, } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditTask = () => {
    const navigate = useNavigate()

    const email = localStorage.getItem('email')
    const { name } = useParams()
    const [taskName, setTaskName] = useState(name)
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])
    const token = localStorage.getItem('token')

    const handleSave = (e) => {
        e.preventDefault()
        axios.put('http://localhost:5000/tasks/tarefas/update',
            { new_name: taskName, user: email, name: name },
            { headers: { 'x-access-token': token } }
        )
            .then(response => {
                if (response.data.errors && response.data.errors.length > 0) {
                    setSuccess([])
                    setErrors([])
                    setErrors(response.data.errors)
                } else {
                    setSuccess([])
                    setErrors([])
                    setSuccess([response.data.success])
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error)
            })
    }

    const handleList = () => {
        navigate('/tasks')
    }

    return (
        <>
            <form onSubmit={handleSave}>
                <Messages errors={errors} success={success} />
                <h1>Editar Tarefa</h1>
                <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                <button type="submit">Editar tarefa</button>
                <button onClick={handleList}>Lista de Tarefas</button>
            </form>
        </>
    )
}

export default withAuth(EditTask)