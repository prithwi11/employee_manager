const express = require('express')
let router = express.Router()

let departmentController = require('../api/controllers/departmentController')
this.departmentControllerObj = new departmentController()

router.route('/edit-view')
    .post(this.departmentControllerObj.getDepartmentDetails)

router.route('/salary-details')
    .post(this.departmentControllerObj.getSalaryDetails)

module.exports = router