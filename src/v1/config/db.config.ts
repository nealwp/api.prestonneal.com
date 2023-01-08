import { createPool } from 'mysql'

const poolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
}

const pool = createPool(poolOptions)

export default pool