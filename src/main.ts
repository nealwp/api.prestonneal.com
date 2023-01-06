import { middleware } from "./middleware"
import { createServer } from "./server"

const PORT: number = 8081

const app = createServer(middleware)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})