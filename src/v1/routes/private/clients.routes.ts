import { Router } from 'express'
import mysql from '../../config/db.config'
const router = Router()

router.route('/').get((req, res, next) => {
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
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

router.route('/:id').get((req, res, next) => {
    const { id } = req.params
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
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

router.route('/create').post((req, res, next) => {
    
    const {businessName, contactFirstName, contactLastName, email} = req.body

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

        const data = [businessName, contactFirstName, contactLastName, email]
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                res.json({error: error.code})
                return next(error)
            }

            if (results.affectedRows == 0) {
                return res.json({text: 'client not created'})
            }
            db.query( `select BIN_TO_UUID(id) as id from clients where business_name = ?`, [businessName], (error, results, fields) => {
                if (error) {
                    return next(error)
                }
                res.json(results)
            })

        });      
        db.release();
    })
})

router.route('/:id').delete((req, res, next) => {
    
    const {id} = req.params

    mysql.getConnection((error, db) => {
        const sql = `
            delete from clients 
            where id = UUID_TO_BIN(?);`

        const data = [id]

        db.query(sql, data, (error, results, fields) => {
            if (error) {
                return next(error)
            }
            if (results.affectedRows == 0){
                return res.json({text: 'client id not found'})
            }
            res.json({text: 'delete successful'})
        });
        db.release();
    })
})

router.route('/:id/update').post((req,res,next) => {
    const { id } = req.params
    const {businessName, contactFirstName, contactLastName, email} = req.body

    mysql.getConnection((error, db) => {
        const sql = `
            update clients
            set business_name = ?, 
                contact_first_name = ?, 
                contact_last_name = ?,
                email = ?
                where id = UUID_TO_BIN(?);`

        const data = [businessName, contactFirstName, contactLastName, email, id]
        
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                res.json({error: error.code})
                return next(error)
            }

            if (results.affectedRows == 0) {
                return res.json({text: 'client id not found'})
            }
            res.json({text: 'update successful'})
        })    
        db.release();
    })
})

export default router