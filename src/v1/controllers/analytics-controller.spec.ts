import { analytics } from "./analytics.controller"
import * as db from "../db"

describe('analytics controller', () => {
    beforeEach(async () => {
        await db.resetCount()
    })
    describe('get site visits', () => {  
        test('should return 1 when 1 visit', async () => {
            const expectedVisits = 1
            await analytics.site.logVisit()
            const result = await analytics.site.getVisitCount()
            expect(result).toEqual(expectedVisits)
        })
        test('should return 0 when no visits', async () => {
            const expectedVisits = 0
            const result = await analytics.site.getVisitCount()
            expect(result).toEqual(expectedVisits)
        })
        test('should return number of visits since last restart', async () => {
            const expectedVisits = 3
            await analytics.site.logVisit()
            await analytics.site.logVisit()
            await analytics.site.logVisit()
            const result = await analytics.site.getVisitCount()
            expect(result).toEqual(expectedVisits)
        })
    })
    describe('log site visit', () => {
        test('should increase the current number of site visits by 1', async () => {
            const expectedVisits = 1
            await analytics.site.logVisit()
            const result = await analytics.site.getVisitCount()
            expect(result).toEqual(expectedVisits)
        })
    })
})