const express = require('express')
const LoginController = require('../controller/loginController.js')
const TodoController = require('../controller/todoController.js')
const { verifyToken } = require('../middlewares/middleware.js')

const router = express.Router()


router.post('/login', LoginController.login)
router.post('/register', LoginController.cadastro)
router.post('/delete/account', LoginController.deletar_conta)
router.post('/trocar_senha', LoginController.trocar_senha)

router.post('/index', verifyToken, TodoController.index)
router.get('/tarefas', verifyToken, TodoController.tarefas)
router.post('/tarefas/add', verifyToken, TodoController.tarefas_add)
router.delete('/tarefas/delete', verifyToken, TodoController.delete)
router.put('/tarefas/update', verifyToken, TodoController.editar)
router.post('/verify_token', verifyToken, (req, res) => {
    res.json({ success: 'Token válido' })
})

module.exports = router
