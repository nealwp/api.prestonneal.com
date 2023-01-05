import express from 'express'

const PORT: number = 8081

const server = express()

server.get('/', (req, res, next) => {
    res.json({message: 'hello friends'})
})

server.get('/health', (req, res, next) => {
    res.status(200).send()
})

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})