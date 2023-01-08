import { Router } from 'express'
import publicApi from './public/routes'

const router = Router()

router.use('/v1', publicApi)

export { router }