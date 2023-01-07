import { site } from "../../src/controllers/analytics.controller"

describe('analytics controller', () => {
    describe('get site visits', () => {
        test('should return 0 when no visits', async () => {
            const expectedVisits = 0
            const result = await site.getVisitCount()
            expect(result).toEqual(expectedVisits)
        })
        test('should return number of visits since last restart', async () => {
            const expectedVisits = 3
            await site.logVisit()
            await site.logVisit()
            await site.logVisit()
            const result = await site.getVisitCount()
            expect(result).toEqual(expectedVisits)
        })
    })
})