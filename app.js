const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const path = require('path')
const morgan = require('morgan')
const validator = require('express-validator')
const validateFormat = require('./app/helpers/validate')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(validator(validateFormat))
app.use(morgan('dev'))
app.use(cors())

const port = process.env.PORT || 3000

const server = http.createServer(app)

const config = require('./app/config/urls').mysql
const url = require('./app/config/urls').api
const datasource = require('./app/databases/mysql')

app.config = config
app.datasource = datasource(app)
app.url = url

app.use((req, res, next) => {
    res.set('X-Powered-By', 'Chupa ... :P')
    next()
})

require('./routes')(app)

app.use((req, res) => res.status(404).json([{
    title: '404', message: 'Route not found'
}]))

server.listen(port)

module.exports = app
