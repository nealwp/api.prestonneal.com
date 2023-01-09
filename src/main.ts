import { middleware } from "./v1/middleware"
import { router } from "./v1/routes"
import { createServer } from "./server"

const PORT: number = 8081

const app = createServer(middleware, router)

app.listen(PORT, () => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}]: server started`)
})