import { Express } from 'express-serve-static-core'
import { createServer } from '../../../server'
import { nullMiddleware } from '../../middleware';
import supertest from 'supertest';
import { Router } from 'express';
import time from './time.routes';

let server: Express;

beforeAll(() => {
    const router = Router()
    router.use('/time', time)
    server = createServer(nullMiddleware, router)
})

jest.mock('../../controllers/time.controller', () => {
    return {
        getHours: () => [],
        getHoursByProjectId: (id: number) => [],
        saveTimeEntry: async (data: any) => data
    }
})

describe('time api v1', () => {
    describe('GET /v1/time', () => {
        test('should return 200 & all time entries', async () => {
            await supertest(server)
                .get(`/time`)
                .set('Authorization', 'DUMMY_TOKEN')
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual([])
                })
        })
    })
    describe('GET /v1/time?projectId=<projectId>', () => {
        test('should return 200 and time entries for project', async () => {
            await supertest(server)
                .get(`/time?projectId=0`)
                .set('Authorization', 'DUMMY_TOKEN')
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual([])
                })
        })
    })
    describe('POST /v1/time/:projectId', () => {
        test('should return 200 and saved time entry', async () => {
            const projectId = 0
            const data = {
                startDatetime: new Date().toISOString(),
                endDatetime: new Date().toISOString(),
                description: 'I did some work',
            }

            const expectedResponse = {
                projectId: projectId.toString(),
                ...data
            }

            await supertest(server)
                .post(`/time/${projectId}`)
                .set('Authorization', 'DUMMY_TOKEN')
                .send(data)
                .expect(200)
                .then(async (res) => {
                    expect(res.body).toEqual(expectedResponse)
                })
        })
    })
})
