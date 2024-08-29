import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import TaskList from './components/TaskList'
import TrocarSenha from './components/TrocarSenha'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add/task" element={<AddTask />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trocar_senha" element={<TrocarSenha />} />
        <Route path="/edit/task/:name" element={<EditTask />} />
      </Routes>
    </Router>
  )
}

export default App
