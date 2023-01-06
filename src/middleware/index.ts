import { corsMiddleware } from './cors.middleware'

const middleware = [
    corsMiddleware
]

const nullMiddleware: any[] = [
    (req: any, res: any, next: any) => next()
]

export { middleware, nullMiddleware }