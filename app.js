const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000
require('./config/database')
const Router = require('./routes/route')
app.use(Router)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)})