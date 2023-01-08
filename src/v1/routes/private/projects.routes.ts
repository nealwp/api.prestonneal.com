import { Router } from 'express'
import mysql from '../../config/db.config.js'
const router = Router()

router.route('/').get((req, res, next) => {
    mysql.getConnection((error, db) => {
        const sql = `
            select 
                BIN_TO_UUID(id) as id, 
                BIN_TO_UUID(client_id) as client_id, 
                name 
            from 
                projects
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
    const { clientID, projectName } = req.body
    mysql.getConnection((error, db) => {
        const sql = `
            insert into projects (id, client_id, name)
            values (null, UUID_TO_BIN(?), ?)
            `
        const data = [clientID, projectName]
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
    const { clientID, projectName } = req.body
    mysql.getConnection((error, db) => {
        const sql = `
            update projects
            set client_id = UUID_TO_BIN(?), name = ?
            where id = UUID_TO_BIN(?)
            `
        const data = [clientID, projectName, id]
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
            select BIN_TO_UUID(id) as id, BIN_TO_UUID(client_id) as client_id, name 
            from projects
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
            delete from projects 
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

export default router