import { Router } from 'express'
import { getClients, getClientById, createClient, deleteClient, updateClient } from '../../controllers/clients.controller'

const router = Router()

router.route('/').get(async (req, res, next) => {
    const clients = await getClients()
    res.json(clients)
})

router.route('/:id').get(async (req, res, next) => {
    const id = req.params.id as unknown
    const client = await getClientById(id as number)
    res.json(client)
})

router.route('/create').post(async (req, res, next) => {
    
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

router.route('/:id').delete(async (req, res, next) => {
    const id = req.params.id as unknown
    await deleteClient(id as number)
    res.status(200).send()
})

router.route('/:id/update').post(async (req,res,next) => {
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

export default router