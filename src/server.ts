import express from 'express'

const PORT: number = 8081

const server = express()

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})