import express from 'express'

export const createServer = async () => {
    const server = express()

    server.get('/', (req, res, next) => {
        res.json({message: 'hello friends'})
    })

    server.get('/health', (req, res, next) => {
        res.status(200).send()
    })

    return server;
}