interface DataStore {
    visits: number,
    [key: string]: any    
}

const db:DataStore = {
    visits: 0
}

const getVisitCount = async (): Promise<number> => {
    return db.visits
}

const logVisit = async (): Promise<void> => {
    db.visits += 1
}

const resetCount = async (): Promise<void> => {
    db.visits = 0
}

export {
    getVisitCount,
    logVisit,
    resetCount
}