import { Router } from 'express'
import { getHours, getHoursByProjectId, saveTimeEntry } from '../../controllers/time.controller'
const time = Router()

time.get('/', async (req, res, next) => {
    const projectId = req.query?.projectId as unknown
    if (!projectId){
        const hours = await getHours()
        return res.json(hours)
    }
    const projectHours = await getHoursByProjectId(projectId as number)
    res.json(projectHours)
})

time.post('/:projectId', async (req, res, next) => {
    const { projectId } = req.params
    const { startDatetime, endDatetime, description } = req.body
    
    const timeEntry = {
        projectId,
        startDatetime,
        endDatetime,
        description
    }
    
    await saveTimeEntry(timeEntry)
    res.status(200).send()
})

export default time