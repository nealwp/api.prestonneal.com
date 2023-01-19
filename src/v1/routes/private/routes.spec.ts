import { Express } from 'express-serve-static-core'
import { createServer } from '../../../server'
import { nullMiddleware } from '../../middleware';
import supertest from 'supertest';
import { Router } from 'express';
import { validateToken } from './routes';

let server: Express;

beforeAll(() => {
    const router = Router()
    router.get('/', validateToken, async (req, res, next) => { return res.status(200).send() })
    server = createServer(nullMiddleware, router)
})

describe('validate token', () => {
    test('should authorize request when token is present', async () => {
        await supertest(server)
            .get(`/`)
            .set('Authorization', 'DUMMY_TOKEN')
            .expect(200)
    })
    test('should return 401 when auth token is not present', async () => {
        await supertest(server)
            .get(`/`)
            .expect(401)
    })
})
