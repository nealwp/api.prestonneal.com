import { Router } from 'express'
import v1Router from './public/router'

const router = Router()

router.use('/v1', v1Router)

export { router }