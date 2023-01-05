import { createServer } from "./server"

const PORT: number = 8081

const app = await createServer()

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})