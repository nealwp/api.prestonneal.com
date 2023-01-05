import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { createServer } from '../src/server'
import supertest from 'supertest';


describe('default test', () => {
    test('should pass', () => {
        expect(true).toBe(true)
    })
});

let server: Express;

beforeAll(async () => {
    server = await createServer()
})

describe('GET /', () => {
    test('should return 200 & message object', async () => {
        await supertest(server)
            .get(`/`)
            .expect(200)
            .then((res) => {
                expect(res.body).toMatchObject({ 'message': 'hello friends' })
            })
    })
})

describe('GET /health', () => {
    test('should return 200', async () => {
        await supertest(server)
            .get(`/health`)
            .expect(200)
    })
})