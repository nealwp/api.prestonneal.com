import * as db from "../db"

const analytics = {
    site: {
        getVisitCount: async () => db.getVisitCount(),
        logVisit: async () => db.logVisit()
    }
}

export { analytics }