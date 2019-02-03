const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app);
const DS = require('./dataStore')
let data_store = DS()
const search = require('./search')

app.use(responseTime((req, res, time) => {
    res.setHeader('X-Response-Time', time)
}))
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send('Go to /search.')
})
const logger = (req, res, next) => {
    console.log('SEARCH', req.query.q)
    next()
}
app.get('/search', [/*logger, */search])

app.use((err, req, res, next) => {
    res.status(500)
    res.send({ error: err })
})

module.exports = http