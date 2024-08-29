const mongoose = require('mongoose')

const todo_schema = new mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type: String
    },
    new_name: {
        type: String
    },
    date: {
        type: Date
    }
})

const todo_model = mongoose.model('tarefas', todo_schema)

class Todo {
    constructor(body) {
        this.body = body
        this.errors = []
        this.tarefa = null
        this.tarefas = null
    }

    async cadastro() {
        const { name, user, date } = this.body
        if (!name || !user || !date) {
            this.errors.push('Preencha todos os dados!')
            return
        }
        try {
            const tarefaRepetida = await todo_model.findOne({ user, name })

            if (tarefaRepetida) {
                this.errors.push('Essa tarefa já existe!')
                return
            }

            const new_tarefa = new todo_model({
                date: date,
                name: name,
                user: user
            })

            this.tarefa = await new_tarefa.save()
        } catch (e) {
            console.log(e)
        }

    }

    async getTarefas() {
        try {
            const { email } = this.body
            const tarefas = await todo_model.find({ user: email })
            this.tarefas = tarefas
        } catch (err) {
            this.errors.push('Não foi possível encontrar suas tarefas')
        }
    }

    async delete() {
        try {
            const { name, user } = this.body

            await todo_model.findOneAndDelete({ name, user })

        } catch (err) {
            this.errors.push('Não foi possível encontrar suas tarefas')
        }
    }

    async update () {
        try {
            console.log(this.body)

            const { new_name, user, name } = this.body
            
            const tarefa_atualizada = await todo_model.findOneAndUpdate(
                { name: name, user: user },
                { name: new_name },
                { new: true }
            )

            if (!tarefa_atualizada) {
                this.errors.push('Não foi possível encontrar a tarefa')
                return
            }

        } catch (err) {
            this.errors.push('Não foi possível encontrar suas tarefas')
        }
    }
}

module.exports = Todo