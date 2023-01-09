import { Router } from 'express'
import v1 from './public/routes'
import { privateApi } from './private/routes'

const router = Router()

router.use('/v1', [v1, privateApi])

export { router }