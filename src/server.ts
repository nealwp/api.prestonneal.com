import express from 'express'

export const createServer = (middleware: any[]) => {
    const server = express()
    
    server.use(middleware)

    server.get('/', (req, res, next) => {
        res.json({message: 'hello friends'})
    })

    server.get('/health', (req, res, next) => {
        res.status(200).send()
    })

    return server;
}