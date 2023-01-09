import { Express } from 'express-serve-static-core'
import { createServer } from '../../../server'
import { nullMiddleware } from '../../middleware';
import supertest from 'supertest';
import { Router } from 'express';
import clients from './clients.routes';

let server: Express;

beforeAll(() => {
    const router = Router()
    router.use('/clients', clients)
    server = createServer(nullMiddleware, router)
})

jest.mock('../../controllers/clients.controller', () => {
    return {
        getClients: () => [], 
        getClientById: () => { return {} }, 
        createClient: (data: any) => {
            data.id = 0
            return data
        }, 
        deleteClient: () => null, 
        updateClient: (data: any) => data
    }
})

describe('v1 clients routes', () => {
    describe('GET /v1/clients', () => {
        test('should return a list of all clients', async () => {
            await supertest(server)
                .get('/clients')
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual([])
                })
        })
    })
    describe('GET /v1/clients/:id', () => {
        test('should return a client record', async () =>{
            await supertest(server)
                .get('/clients/0')
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual({})
                })
        })
    })
    describe('POST /v1/clients', () => {
        test('should create a client record', async () =>{
            
            const client = {
                businessName: 'business',
                contactFirstName: 'firstName',
                contactLastName: 'lastName',
                email: 'email@mail.com'
            }
            
            const expectedClientRecord = {
                id: 0,
                ...client
            }

            await supertest(server)
                .post('/clients')
                .send(client)
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual(expectedClientRecord)
                })
        })
    })
    describe('DELETE /v1/clients/:id', () => {
        test('should delete a client record', async () =>{
            await supertest(server)
                .delete('/clients/0')
                .expect(200)
        })
    })
    describe('POST /v1/clients/:id', () => {
        test('should update a client record', async () => {
            const client = {
                businessName: 'business2',
                contactFirstName: 'firstName2',
                contactLastName: 'lastName2',
                email: 'email2@mail.com'
            }

            const expectedClientRecord = {
                id: "0",
                ...client
            }

            await supertest(server)
                .post('/clients/0')
                .send(client)
                .expect(200)
                .then(res => {
                    expect(res.body).toEqual(expectedClientRecord)
                })

        })
    })
})