const app = require('./app')

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running at port', process.env.PORT || 5000)
})