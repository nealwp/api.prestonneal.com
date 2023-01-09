import { corsMiddleware } from './cors.middleware'
import { loggerMiddleware } from './logger.middleware'
import bodyParserMiddleware from './bodyparser.middleware'

const middleware = [
    corsMiddleware,
    loggerMiddleware,
    bodyParserMiddleware
]

const nullMiddleware: any[] = [
    bodyParserMiddleware,
    (req: any, res: any, next: any) => next()
]

export { middleware, nullMiddleware }