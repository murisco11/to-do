import React, { useState } from "react"
import axios from "axios"
import withAuth from "./WithAuth"
import Messages from "./Messages"
import { useNavigate } from "react-router-dom"

const LiTask = ({ tarefas = [], onUpdateTarefas }) => {
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate()

    const handleDelete = async (tarefaName) => {
        try {
            const response = await axios.delete('http://localhost:5000/tasks/tarefas/delete', {
                headers: { 'x-access-token': token },
                data: { name: tarefaName, user: email }
            })
            if (response.data.errors && response.data.errors.length > 0) {
                setSuccess([])
                setErrors([])
                setErrors(response.data.errors)
            } else {
                setSuccess([])
                setErrors([])
                setSuccess([response.data.success])
                onUpdateTarefas()
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
        }
    }

    const handleEdit = (tarefaName) => {
        navigate(`/edit/task/${encodeURIComponent(tarefaName)}`)
    }

    const formatted_data = (data) => {
        const date = new Date(data)
  
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
      
        return `${day}/${month}/${year}`  
    }

    return (
        <>
            <h1>Lista de tarefas:</h1>
            <Messages errors={errors} success={success} />
            {tarefas.map((tarefa, index) => (
                <li key={index} id={tarefa.name}>
                    <h2>{tarefa.name} ({formatted_data(tarefa.date)})</h2>
                    <br />
                    <div className="btnLi">
                        <button onClick={() => handleDelete(tarefa.name)}>Deletar</button>
                        <button onClick={() => handleEdit(tarefa.name)}>Editar</button>
                    </div>
                </li>
            ))}
        </>
    )
}

export default withAuth(LiTask)
