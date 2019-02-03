const ds = require('./dataStore')()

const search = async (req, res) => {
    let query = req.query.q
    if(query.length < 3) res.send({ error: 'Query too short. Minimum 3 characters required.' })
    else {
        let then = Date.now()
        ds.search(query).then(data => {
            res.send(data)
        })
        .catch(e => {
            res.status(500)
            res.send({ error: e })
        })
    }
}

module.exports = search