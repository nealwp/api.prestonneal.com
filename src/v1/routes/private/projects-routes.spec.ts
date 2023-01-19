import { Express } from 'express-serve-static-core'
import { createServer } from '../../../server'
import { nullMiddleware } from '../../middleware';
import supertest from 'supertest';
import { Router } from 'express';
import projects from './projects.routes';

let server: Express;

beforeAll(() => {
    const router = Router()
    router.use('/projects', projects)
    server = createServer(nullMiddleware, router)
})

jest.mock('../../controllers/projects.controller', () => {
    return {
        getProjects: () => [],
        createProject: async (data: any) => data,
        updateProject: async (data: any) => data,
        getProjectById: (id: string) => {},
        deleteProject: async (id: string) => {}
    }
})

describe('projects api v1', () => {
    describe('GET /v1/projects', () => {
        test('should return 200 & all projects', async () => {
            await supertest(server)
                .get(`/projects`)
                .set('Authorization', 'DUMMY_TOKEN')
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual([])
                })
        })
    })
})