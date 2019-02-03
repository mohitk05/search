const assert = require('chai').assert
const ds = require('../dataStore')()

describe('GET /search', () => {
    it(`Search should return score < 1 for 'Corby'`, async () => {
        let data = (await ds.search('Corby'))['data']
        let score = data && data[0] && data[0].score
        assert.isBelow(score, 1)
    })

    it(`Search should return score = 1 for 'Corby Feedmix Pippin'`, async () => {
        let data = (await ds.search('Corby Feedmix Pippin'))['data']
        let score = data && data[0] && data[0].score
        assert.equal(score, 1)
    })

    it(`Score for 'Corby Feedmix' will be greater than that for 'Corby'`, async () => {
        let data1 = (await ds.search('Corby Feedmix'))['data']
        let data2 = (await ds.search('Corby'))['data']
        let score1 = data1 && data1[0] && data1[0].score
        let score2 = data2 && data2[0] && data2[0].score
        assert.isAbove(score1, score2)
    })
})