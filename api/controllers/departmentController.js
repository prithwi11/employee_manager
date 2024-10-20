module.exports = class departmentController {
    constructor() {
        const departmentModel = require('../models/model.department')
        this.departmentModelObj = new departmentModel()
    }

    getDepartmentDetails = async(req, res) => {
        try {
            const response_dataset = {}
            const dept_no = req.body.dept_no
            const result = await this.departmentModelObj.getDepartmentDetails(dept_no)
            response_dataset.list = result
            return global.Helpers.successStatusBuild(res, response_dataset, 'Data fetched')
        }
        catch(error) {
            console.log(error)
            return global.Helpers.badRequestStatusBuild(res, 'Some error occurred')
        }
    }

    getSalaryDetails = async(req, res) => {
        try {
            let response_dataset = {}
            const data = await this.departmentModelObj.getDepartmentWiseExpense()
            response_dataset.salary = data
            return global.Helpers.successStatusBuild(res, response_dataset, 'Data fetched')
        }
        catch(e) {
            console.log(e)
            return global.Helpers.badRequestStatusBuild(res, 'Some error occurred')
        }
    }

}