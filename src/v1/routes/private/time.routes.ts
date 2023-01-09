import { Router } from 'express'
import { getHours, getHoursByProjectId, saveTimeEntry } from '../../controllers/time.controller'
const time = Router()

time.get('/', async (req, res, next) => {
    const hours = await getHours()
    return res.json(hours)   
})

time.get('/:projectId', async (req, res, next) => {
    const projectId = req.params.projectId as unknown
    const projectHours = await getHoursByProjectId(projectId as number)
    res.json(projectHours)
})

time.post('/:projectId', async (req, res, next) => {
    const projectId = req.params.projectId
    const { startDatetime, endDatetime, description } = req.body
    
    const timeEntry = {
        projectId,
        startDatetime,
        endDatetime,
        description
    }
    
    const savedEntry = await saveTimeEntry(timeEntry)
    res.json(savedEntry)
})

export default time