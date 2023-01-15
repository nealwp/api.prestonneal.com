# api.prestonneal.com
![build](https://github.com/nealwp/api.prestonneal.com/actions/workflows/build.yaml/badge.svg)

Featuring:
- TypeScript
- Jest & Supertest
- NodeJS
- Express
- Docker
- GitHub Actions

# *Le Grande Tour*
## Project Structure
```text
src
├── v1                                      # api version 1 goes here
│   ├── config                              # config files
│   │   └── db.config.ts
│   │
│   ├── controllers
│   │   ├── analytics-controller.spec.ts    # tests are colocated
│   │   ├── analytics.controller.ts         # behavior for given route
│   │   ...
│   │   
│   ├── middleware
│   │   ├── cors.middleware.ts
│   │   ├── index.ts                        # imports all middleware for single export
│   │   ...
│   │
│   ├── routes
│   │   ├── private                         # routes that require auth
│   │   │   ├── clients.routes.ts
│   │   │   ├── clients-routes.spec.ts
│   │   │   ├── routes.ts                   # imports all private routes for singe export
│   │   │   ...
│   │   │
│   │   ├── public                          # routes without auth requirement
│   │   │   ├── routes.spec.ts
│   │   │   ├── routes.ts
│   │   │   ...
│   │   │
│   │   └── index.ts                        # imports all routes for single export
│   │
│   └── db.ts                               # simple in-memory datastore
│
├── main.ts                                 # app entrypoint; imports everything and listens
├── server.spec.ts
└── server.ts                               # core server
```