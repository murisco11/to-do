const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./routes/todoRoutes.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})