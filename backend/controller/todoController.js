const Todo = require('../models/todoModel')

exports.index = (req, res, next) => {
    res.json({ success: 'Você está sendo encaminhado para a página de tasks' })
}

exports.tarefas = async (req, res, next) => {
    try {
        const email = req.query.email
        const tarefas = new Todo({ email })

        await tarefas.getTarefas()

        if (tarefas.errors.length > 0) {
            return res.status(400).json({ errors: tarefas.errors })
        }

        res.json({
            success: 'Tarefas carregadas com sucesso',
            tarefas: tarefas.tarefas
        })
    } catch (e) {
        console.log(e)
    }
}

exports.tarefas_add = async (req, res, next) => {
    try {
        const tarefas_add = new Todo(req.body)
        await tarefas_add.cadastro()

        if (tarefas_add.errors.length > 0) {
            res.json({ errors: tarefas_add.errors })
            return
        }

        res.json({
            success: 'Tarefa cadastrada com sucesso',
        })
    } catch (e) {
        console.log(e)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const tarefas_delete = new Todo(req.body)
        await tarefas_delete.delete()

        if (tarefas_delete.errors.length > 0) {
            res.json({ errors: tarefas_delete.errors })
            return
        }

        res.json({
            success: 'Sua tarefa foi deletada com sucesso!'
        })
    }
    catch (e) {
        console.log(e)
    }
}

exports.editar = async (req, res, next) => {
    try {
        const tarefa_atualizar = new Todo(req.body)
        await tarefa_atualizar.update()

        if (tarefa_atualizar.errors.length > 0) {
            console.log(tarefa_atualizar.errors)
            res.json({ errors: tarefa_atualizar.errors })
            return
        }
        
        res.json({
            success: 'Sua tarefa foi atualizada com sucesso!'
        })
    }

    catch (e) {
        console.log(e)
    }
}