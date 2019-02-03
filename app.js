const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const DS = require('./dataStore')
let data_store = DS()
const search = require('./search')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Go to /search.')
})
app.get('/search', [(req, res, next) => {
    console.log('SEARCH', req.query.q)
    next()
}, search])

app.use((err, req, res, next) => {
    res.status(500)
    res.send({ error: err })
})

module.exports = app