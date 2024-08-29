import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Messages from "./Messages"

const TrocarSenha = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState([])

    const handleTrocarSenha = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/tasks/trocar_senha', { email, password, new_password: newPassword })
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

    const handleLogin = () => {
        navigate('/')
    }

    return (
        <>
            <Messages errors={errors} success={success} />
            <form onSubmit={handleTrocarSenha}>
                <h1>Trocar senha</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="new_password">Nova senha</label>
                <input type="password" name="new_password" id="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button type="submit">Trocar Senha</button>
            </form>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default TrocarSenha