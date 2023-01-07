import { Express } from 'express-serve-static-core'
import { createServer } from '../src/server'
import { nullMiddleware } from '../src/middleware';
import supertest from 'supertest';

let server: Express;

beforeAll(() => {
    server = createServer(nullMiddleware)
})

describe('api v1', () => {
    describe('GET /v1/', () => {
        test('should return 200 & message object', async () => {
            await supertest(server)
                .get(`/v1/`)
                .expect(200)
                .then((res) => {
                    expect(res.body).toMatchObject({ 'message': 'hello friends' })
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
}) 
