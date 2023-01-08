import mysql from '../config/db.config'

const getProjects = async () => {
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
                throw error
            }
            return results
        });
        db.release();
    })
}

const createProject = async (project: any) => {
    mysql.getConnection((error, db) => {
        const sql = `
            insert into projects (id, client_id, name)
            values (null, UUID_TO_BIN(?), ?)
            `
        const data = [project.clientID, project.projectName]
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }
            return results
        });
        db.release();
    })
}

const updateProject = async (project: any) => {
    mysql.getConnection((error, db) => {
        const sql = `
            update projects
            set client_id = UUID_TO_BIN(?), name = ?
            where id = UUID_TO_BIN(?)
            `
        const data = [project.clientID, project.projectName, project.id]
        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }

            if (results.affectedRows == 0) {
                throw Error('project id not found')
            }
            return results
        });
        db.release();
    })
}

const getProjectById = async (id: number) => {
    mysql.getConnection((error, db) => {
        const sql = `
            select BIN_TO_UUID(id) as id, BIN_TO_UUID(client_id) as client_id, name 
            from projects
            where id = UUID_TO_BIN(?)
            `
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

const deleteProject = async (id: number) => {
    mysql.getConnection((error, db) => {
        const sql = `
            delete from projects 
            where id = UUID_TO_BIN(?);`

        const data = [id]

        db.query(sql, data, (error, results, fields) => {
            if (error) {
                throw error
            }
            if (results.affectedRows == 0){
                throw Error('client id not found')
            }
            return results
        });
        db.release();
    })
}

export { getProjects, createProject, updateProject, getProjectById, deleteProject }