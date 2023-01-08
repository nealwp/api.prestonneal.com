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
```bash
src/ 
| - v1/                         # all of API v1 goes in here 
| - | - config/                 # configuration files
| - | - controllers/  
| - | - | <route>.controller.ts # behavior for <route>
| - |
| - | - middleware/
| - | - | index.ts              # imports all mw into one export
| - | 
| - | - routes/         
| - | - | - private/            # routes that require auth  
| - | - | - public/             # routes w/o auth  
| - | - | index.ts              # imports all routes into one export
| - |
| - | db.ts                     # simple in-memory datastore
|
| main.ts                       # application entrypoint
| server.ts                     # imports routes and middleware
| 
```