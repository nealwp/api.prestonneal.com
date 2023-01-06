import { corsMiddleware } from './cors.middleware'
import { loggerMiddleware } from './logger.middleware'

const middleware = [
    corsMiddleware,
    loggerMiddleware
]

const nullMiddleware: any[] = [
    (req: any, res: any, next: any) => next()
]

export { middleware, nullMiddleware }