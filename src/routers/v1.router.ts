import { Router } from "express";

const router = Router()

router.get('/', (req, res, next) => {
    res.json({message: 'hello friends'})
})

router.get('/health', (req, res, next) => {
    res.status(200).send()
})

export default router