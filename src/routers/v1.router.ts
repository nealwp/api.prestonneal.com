import { Router } from "express";
import { analytics} from "../controllers/analytics.controller";

const router = Router()

router.get('/', (req, res, next) => {
    res.json({ version: 1 })
})

router.get('/health', (req, res, next) => {
    res.status(200).send()
})

router.get('/analytics/site-visits', async (req, res, next) => {
    const visits = await analytics.site.getVisitCount()
    const data = {
        siteVisits: visits
    }
    res.status(200).json(data)
})

export default router