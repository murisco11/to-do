import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import withAuth from './WithAuth'
import Messages from "./Messages"
import axios from "axios"

const AddTask = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])

    const handleForm = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const email = localStorage.getItem('email')
        axios.post('http://localhost:5000/tasks/tarefas/add',
            {
                date: date,
                name: name,
                user: email
            },
            {
                headers: { 'x-access-token': token }
            })
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
            <form onSubmit={handleForm}>
                <Messages errors={errors} success={success} />
                <h1>Adicionar tarefa</h1>
                <label>Nome:</label>
                <input type="text" id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                <label>Data limite:</label>
                <input type="date"  name="date" id="date" value={date} b onChange={(e) => setDate(e.target.value)} />
                <button type="submit">Cadastrar tarefa</button>
                <button onClick={handleList}>Lista de Tarefas</button>
            </form>
        </>
    )
}

export default withAuth(AddTask)