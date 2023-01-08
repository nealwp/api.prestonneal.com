import { Router } from 'express'
import mysql from '../../config/db.config'
const router = Router()

router.route('/').get((req, res, next) => {
    mysql.getConnection((error, db) => {   
        if (!req.query?.project_id){
            var sql = `
            select 
                id,
                start_dttm,
                end_dttm,
                BIN_TO_UUID(project_id) as project_id,
                description, 
                BIN_TO_UUID(client_id) as client_id, 
                invoice_number,
                hours,
                minutes 
            from 
                hours
            `
            var data = [null]
        } else {
            const {project_id} = req.query
            var sql = `
            select 
                id,
                start_dttm,
                end_dttm,
                BIN_TO_UUID(project_id) as project_id,
                description, 
                BIN_TO_UUID(client_id) as client_id, 
                invoice_number,
                hours,
                minutes 
            from hours
            where project_id = UUID_TO_BIN(?)
            `
            var data = [project_id]
        }

        db.query(sql, data,(error, results, fields) => {
            if (error) {
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

router.route('/').get((req, res, next) => {
    const { project_id } = req.query
    mysql.getConnection((error, db) => {
        const sql = `
            select 
                id,
                start_dttm,
                end_dttm,
                BIN_TO_UUID(project_id) as project_id,
                description, 
                BIN_TO_UUID(client_id) as client_id, 
                invoice_number,
                hours,
                minutes 
            from 
                hours
            where project_id = UUID_TO_BIN(?)
            `
        const data = [project_id]
        db.query(sql, data,(error, results, fields) => {
            if (error) {
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

router.route('/:project_id').post((req, res, next) => {
    const { project_id } = req.params
    const { start_datetime, end_datetime, description } = req.body 
    mysql.getConnection((error, db) => {
        const sql = `
            insert into hours (
                id, start_dttm, end_dttm, project_id, description, client_id
            )
            values (
                null, 
                str_to_date(?, '%m/%d/%Y %l:%i%p'), 
                str_to_date(?, '%m/%d/%Y %l:%i%p'), 
                UUID_TO_BIN(?), 
                ?, 
                (select client_id from projects where id = UUID_TO_BIN(?))
            )
            `
        const data = [start_datetime, end_datetime, project_id, description, project_id]
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                return next(error)
            }
            res.json(results)
        });
        db.release();
    })
})

export default router