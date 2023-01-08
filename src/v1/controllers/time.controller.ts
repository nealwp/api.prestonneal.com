import mysql from '../config/db.config'

const getHours = async () => {
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
        `
        db.query(sql, (error, results, fields) => {
            if (error) {
                throw error
            }
            return results
        });
        db.release();
    })

}

const getHoursByProjectId = async (projectId: number) => {
    mysql.getConnection((error, db) => {
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
        var data = [projectId]
        db.query(sql, data,(error, results, fields) => {
            if (error) {
                throw error
            }
            return results
        });
    db.release();
    }
)}

const saveTimeEntry = async (timeEntry: any) => {
    mysql.getConnection((error, db) => {
        const sql = `
            insert into hours (
                id, 
                start_dttm, 
                end_dttm, 
                project_id, 
                description, 
                client_id
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
        const data = [
            timeEntry.startDatetime,
            timeEntry.endDatetime,
            timeEntry.projectId,
            timeEntry.description,
            timeEntry.projectId
        ]

        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }
            return results
        });
        db.release();
    })
}


export { getHours, getHoursByProjectId, saveTimeEntry }