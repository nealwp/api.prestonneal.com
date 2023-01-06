const logger = (req: any, res: any, next: any) => {
    const { method, url } = req
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}]: ${method} ${url}`)
    next()
}
const loggerMiddleware = logger
export { loggerMiddleware }