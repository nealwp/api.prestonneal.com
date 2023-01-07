let siteVisits = 0

const site = {
    getVisitCount: async () => siteVisits,
    logVisit: async () => siteVisits += 1
}

export { site }