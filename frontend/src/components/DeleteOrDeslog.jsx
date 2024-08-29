import React from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Messages from "./Messages"

const DeleteOrDeslog = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])

    const handleDeslog = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const handleDelete = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tasks/delete/account', {
                email: email
            })
            if (response.data.errors && response.data.errors.length > 0) {
                setSuccess([])
                setErrors([])
                setErrors(response.data.errors)
            } else {
                localStorage.removeItem('token')
                navigate('/')
                setSuccess([])
                setErrors([])
                setSuccess(response.data.success)
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
        }
    }

    return (
        <>
            <Messages errors={errors} success={success} />
            <button onClick={handleDeslog}>Deslogar</button>
            <button onClick={handleDelete}>Deletar conta</button>
        </>
    )
}

export default DeleteOrDeslog