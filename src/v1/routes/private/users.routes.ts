import { Router } from 'express'
import mysql from '../../config/db.config'
const router = Router()

router.route('/').get((req, res, next) => {
    mysql.getConnection((error, db) => {
        const sql = `
            select 
                BIN_TO_UUID(id) as id, 
                first_name,
                last_name,
                business_name,
                email
            from 
                users
            `
        db.query(sql, (error, results, fields) => {
            if (error) {
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

router.route('/create').post((req, res, next) => {
    const { firstName, lastName, businessName, email } = req.body
    mysql.getConnection((error, db) => {
        const sql = `
            insert into users (id, first_name, last_name, business_name, email)
            values (UUID_TO_BIN(UUID()), ?, ?, ?, ?)
            `
        const data = [firstName, lastName, businessName, email]
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

router.route('/:id/update').post((req, res, next) => {
    const { id } = req.params
    const { firstName, lastName, businessName } = req.body
    mysql.getConnection((error, db) => {
        const sql = `
            update users
            set first_name = ?, last_name = ?, business_name = ?
            where id = UUID_TO_BIN(?)
            `
        const data = [firstName, lastName, businessName, id]
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                res.json({error: error.code})
                return next(error)
            }

            if (results.affectedRows == 0) {
                return res.json({text: 'project id not found'})
            }
            res.json({text: 'update successful'})
        });
        db.release();
    })
})

router.route('/:id').get((req, res, next) =>{
    const { id } = req.params
    mysql.getConnection((error, db) => {
        const sql = `
            select 
                BIN_TO_UUID(id) as id, 
                first_name, 
                last_name, 
                business_name,
                email 
            from users
            where id = UUID_TO_BIN(?)
            `
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

router.route('/:id').delete((req, res, next) => {
    const {id} = req.params

    mysql.getConnection((error, db) => {
        const sql = `
            delete from users 
            where id = UUID_TO_BIN(?);`

        const data = [id]

        db.query(sql, data, (error, results, fields) => {
            if (error) {
                return next(error)
            }
            if (results.affectedRows == 0){
                return res.json({text: 'user id not found'})
            }
            res.json({text: 'delete successful'})
        });
        db.release();
    })    
})

export default router