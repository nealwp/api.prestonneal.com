import { Router } from "express";
import { analytics} from "../../controllers/analytics.controller";
import { version } from '../../../../package.json'

const v1 = Router()

v1.get('/', (req, res, next) => {
    res.json({ apiVersion: version })
})

v1.get('/health', (req, res, next) => {
    res.status(200).send()
})

v1.get('/analytics/site-visits', async (req, res, next) => {
    const visits = await analytics.site.getVisitCount()
    const data = {
        siteVisits: visits
    }
    res.status(200).json(data)
})

v1.post('/analytics/site-visits', async (req, res, next) => {
    await analytics.site.logVisit()
    const visits = await analytics.site.getVisitCount()
    const data = {
        siteVisits: visits
    }
    res.status(200).json(data)
})

export default v1