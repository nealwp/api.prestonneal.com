import { Router } from 'express'
import publicApi from './public/routes'
import { privateApi } from './private/routes'

const router = Router()

router.use('/v1', [publicApi, privateApi])

export { router }