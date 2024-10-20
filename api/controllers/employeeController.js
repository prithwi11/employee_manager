module.exports = class employeeController {
    constructor() {
        const employeeModel = require('../models/model.employees')
        this.employeeModelObj = new employeeModel()
    }

    getEmployeeSalary = async(req, res) => {
        try {
            let response_dataset = {}
            const employee_id = req.body.employee_id
            let employee_salary_details = await this.employeeModelObj.getEmployeeSalaryDetails(employee_id)
            console.log(employee_salary_details)
            response_dataset.salary_details = employee_salary_details
            return global.Helpers.successStatusBuild(res, response_dataset, 'Data fetched')
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred')
        }
    }
}