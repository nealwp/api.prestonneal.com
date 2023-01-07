import { middleware } from "./middleware"
import { createServer } from "./server"

const PORT: number = 8081

const app = createServer(middleware)

app.listen(PORT, () => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}]: server started`)
})