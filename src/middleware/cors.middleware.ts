import cors, { CorsOptions } from 'cors'

const allowedOrigins: string[] = [
    'http://localhost:5173',
    'https://prestonneal.com'
]

const options: CorsOptions = {
    origin: allowedOrigins
}

const corsMiddleware = cors(options)

export { corsMiddleware }