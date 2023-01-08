import { Express } from 'express-serve-static-core'
import { createServer } from '../../../src/server'
import { nullMiddleware } from '../../../src/v1/middleware';
import supertest from 'supertest';

let server: Express;

beforeAll(() => {
    server = createServer(nullMiddleware)
})

describe('api v1', () => {
    describe('GET /v1/', () => {
        test('should return 200 & api version', async () => {
            await supertest(server)
                .get(`/v1/`)
                .expect(200)
                .then((res) => {
                    expect(res.body).toMatchObject({ 'version': 1 })
                })
        })
    })
    
    describe('GET /v1/health', () => {
        test('should return 200', async () => {
            await supertest(server)
                .get(`/v1/health`)
                .expect(200)
        })
    })
    describe('GET /v1/analytics/site-visits', () => {
        test('should return number of site visits since last restart', async () => {
            await supertest(server)
                .get('/v1/analytics/site-visits')
                .expect(200)
                .then((res) => {
                    expect(res.body.siteVisits).toEqual(0)
                })
        })
    })
    describe('POST /v1/analytics/site-visits', () => {
        test('should add 1 to the site visit count', async () => {
            await supertest(server)
                .post('/v1/analytics/site-visits')
                .expect(200)
                .then((res) => {
                    expect(res.body.siteVisits).toEqual(1)
                })
            await supertest(server)
                .post('/v1/analytics/site-visits')
                .expect(200)
                .then((res) => {
                    expect(res.body.siteVisits).toEqual(2)
                })
            await supertest(server)
                .post('/v1/analytics/site-visits')
                .expect(200)
                .then((res) => {
                    expect(res.body.siteVisits).toEqual(3)
                })
        })
    })
}) 
