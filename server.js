const express = require ('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/tarefas', async (req, res) => {
    const tarefas = await prisma.tarefa.findMany()
    res.json(tarefas)
})

app.get('/tarefas/:id', async(req, res) => {
    const {id} = req.params
    const tarefa = await prisma.tarefa.findUnique({
        where: {id: parseInt(id)}
    })
    if(!tarefa){
        return res.status(404).json({error:'Tarefa não encontrada'})
    }
    res.json(tarefa)
})

app.put('/tarefas/:id', async(req, res) => {
    const {id} = req.params
    const {nome, descricao, status} = req.body

    const tarefa = await prisma.tarefa.update({
        where: {id: parseInt(id)},
        data: {nome, descricao, status}
    })
    res.json
})

app.post('/tarefas', async (req, res) => {
    const{nome, descricao, status} = req.body
    const tarefa = await prisma.tarefa.create({
        data: {nome, descricao, status}
    })
    res.json(tarefa)
})

app.delete('/tarefas/:id', async(req, res) => {
    const {id} = req.params

    await prisma.tarefa.delete({
        where: {id: parseInt(id)}
    })
    res.status(204).send()
})

app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`)
})