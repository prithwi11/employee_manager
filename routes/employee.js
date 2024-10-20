const express = require('express')
let router = express.Router()

let employeeController = require('../api/controllers/employeeController')
this.employeeControllerObj = new employeeController()

router.route('/salary-details')
    .post(this.employeeControllerObj.getEmployeeSalary)

module.exports = router