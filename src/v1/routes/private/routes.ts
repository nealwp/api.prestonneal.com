import { Router } from "express";
import clients from "./clients.routes";
import projects from "./projects.routes";
import time from "./time.routes";

const privateApi = Router()

const validateToken = async (req: any, res: any, next: any) => {
    if(!req.headers.authorization){
        res.status(401).send()
        return
    }
    return next()
}

privateApi.use(validateToken)
privateApi.use('/clients', clients)
privateApi.use('/project', projects)
privateApi.use('/time', time)

export { privateApi, validateToken }