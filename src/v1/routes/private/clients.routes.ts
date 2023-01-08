import { Router } from 'express'
import { getClients, getClientById, createClient, deleteClient, updateClient } from '../../controllers/clients.controller'

const clients = Router()

clients.get('/', async (req, res, next) => {
    const clients = await getClients()
    res.json(clients)
})

clients.get('/:id', async (req, res, next) => {
    const id = req.params.id as unknown
    const client = await getClientById(id as number)
    res.json(client)
})

clients.post('/', async (req, res, next) => {
    
    const {businessName, contactFirstName, contactLastName, email} = req.body

    const client = {
        businessName,
        contactFirstName,
        contactLastName,
        email
    }

    const clientRecord = await createClient(client)
    res.json(clientRecord)
    
})

clients.delete('/:id', async (req, res, next) => {
    const id = req.params.id as unknown
    await deleteClient(id as number)
    res.status(200).send()
})

clients.post('/:id', async (req,res,next) => {
    const { id } = req.params
    const {businessName, contactFirstName, contactLastName, email} = req.body

    const client = {
        id,
        businessName,
        contactFirstName,
        contactLastName,
        email
    }

    const updatedClient = await updateClient(client)
    res.json(updatedClient)
})

export default clients