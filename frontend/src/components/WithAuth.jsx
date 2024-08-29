import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/')
        return
      }

      axios.post('http://localhost:5000/tasks/index', {}, {
        headers: { 'x-access-token': token }
      })
        .then(response => {
          console.log(response.data.success)
        })
        .catch(() => {
          navigate('/')
        })
    }, [navigate])

    return <WrappedComponent {...props} />
  }
}

export default withAuth