const express = require('express')


//Setting Database
const ConnectionC = require('./config/configuration')
global.Connection_mynode = new ConnectionC()
global.Connection_mynode.connectToMYSQL()

///Initiate Common FUnction
const commonFunc = require('./helpers/CommonHelper')
global.Helpers = new commonFunc()

//Initiating config
global.CONFIG = require('./config/development')

//Importing Routes
let departmentRoute = require('./routes/department')
let employeeRoute = require('./routes/employee')

//Initialize app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/department/', departmentRoute)
app.use('/v1/employee/', employeeRoute)
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
require('dotenv').config();