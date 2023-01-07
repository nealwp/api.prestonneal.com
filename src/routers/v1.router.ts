import { Router } from "express";
import { site } from "../controllers/analytics.controller";

const router = Router()

router.get('/', (req, res, next) => {
    res.json({ version: 1 })
})

router.get('/health', (req, res, next) => {
    res.status(200).send()
})

router.get('/analytics/site-visits', async (req, res, next) => {
    const visits = await site.getVisitCount()
    res.status(200).send()
})

export default router