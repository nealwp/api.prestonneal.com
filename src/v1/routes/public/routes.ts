import { Router } from "express";
import { analytics} from "../../controllers/analytics.controller";
import { version } from '../../../../package.json'

const router = Router()

router.get('/', (req, res, next) => {
    res.json({ apiVersion: version })
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

router.post('/analytics/site-visits', async (req, res, next) => {
    await analytics.site.logVisit()
    const visits = await analytics.site.getVisitCount()
    const data = {
        siteVisits: visits
    }
    res.status(200).json(data)
})

export default router