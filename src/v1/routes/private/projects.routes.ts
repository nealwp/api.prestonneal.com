import { Router } from 'express'
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../../controllers/projects.controller'

const projects = Router()

projects.get('/', async (req, res, next) => {
    const projects = await getProjects()
    res.json(projects)
})

projects.post('/', async (req, res, next) => {
    const { clientID, projectName } = req.body
    const project = {
        clientID,
        projectName
    }
    const newProject = await createProject(project)
    res.json(newProject)
})

projects.post('/:id', async (req, res, next) => {
    const { id } = req.params
    const { clientID, projectName } = req.body
    const project = {
        id,
        clientID,
        projectName
    }
    const updatedProject = await updateProject(project)
    res.json(updatedProject)

})

projects.get('/:id', async (req, res, next) => {
    const id = req.params.id as unknown
    const project = await getProjectById(id as number)
    res.json(project)
})

projects.delete('/:id', async (req, res, next) => {
    const id = req.params.id as unknown
    const deletedProject = await deleteProject(id as number)
    res.json(deletedProject)
})

export default projects