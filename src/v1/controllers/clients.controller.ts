import mysql from '../config/db.config'

const getClients = async () => {
    mysql.getConnection((error, db) => {
        const sql = `
            select 
                BIN_TO_UUID(id) as id,
                business_name,
                contact_first_name,
                contact_last_name,
                email 
            from 
                clients`
        db.query(sql, (error, results, fields) => {
            if (error) {
                throw error
            }
            return results
        });
        db.release();
    })
}

const getClientById = async (id: number) => {
    mysql.getConnection((error, db) => {
        const sql = `
            select 
                BIN_TO_UUID(id) as id,
                business_name,
                contact_first_name,
                contact_last_name,
                email 
            from 
                clients
            where
                BIN_TO_UUID(id) = ?`
        
        const data = [id]    
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }
            return results
        });
        db.release();
    })
}

const createClient = async (client: any) => {
    mysql.getConnection((error, db) => {
        const sql = `
        insert into 
            clients(
                id, 
                business_name, 
                contact_first_name, 
                contact_last_name,
                email
            )
        values (
            UUID_TO_BIN(UUID()), ?, ?, ?, ?
            );`

        const data = [
            client.businessName,
            client.contactFirstName,
            client.contactLastName,
            client.email
        ]

        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }

            if (results.affectedRows == 0) {
                throw Error('client not created')
            }

            db.query(`select BIN_TO_UUID(id) as id from clients where business_name = ?`,
             [client.businessName], (error, results, fields) => {
                if (error) {
                    throw error
                }
                return results
            })

        });      
        db.release();
    })
}

const deleteClient = async (id: number) => {
    mysql.getConnection((error, db) => {
        const sql = `
            delete from clients 
            where id = UUID_TO_BIN(?);`

        const data = [id]

        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }
            if (results.affectedRows == 0){
                throw Error('client id not found')
            }
            return {text: 'delete successful'}
        });
        db.release();
    })
}

const updateClient = async (client: any) => {
    mysql.getConnection((error, db) => {
        const sql = `
            update clients
            set business_name = ?, 
                contact_first_name = ?, 
                contact_last_name = ?,
                email = ?
                where id = UUID_TO_BIN(?);`

        const data = [
            client.businessName,
            client.contactFirstName,
            client.contactLastName,
            client.email,
            client.id
        ]
        
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }

            if (results.affectedRows == 0) {
                throw Error('client id not found')
            }

            return results
        })    
        db.release();
    })
}

export { getClients, getClientById, createClient, deleteClient, updateClient } 