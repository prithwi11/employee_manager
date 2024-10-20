'use Strict'
const { DataTypes } = require('sequelize')
const Model = require('./model')

class departmentModel extends Model {
    constructor() {
        super(
            'departments', 
            {
                dept_no : {
                    type : DataTypes.CHAR,
                    primaryKey : true,
                },
                dept_name : {
                    type : DataTypes.STRING
                }
            },
            {
                freezeTableName : true,
                timestamps : false
            }
        )
    }

    associateWithDepartmentManager() {
        const departmentManagerModel = require('./model.department.manager')
        this.departmentManagerMapModel = new departmentManagerModel()

        this.Model.hasMany(this.departmentManagerMapModel.Model, {foreignKey : 'dept_no'})
        return this.departmentManagerMapModel
    }

    associateWithDepartmentEmployee() {
        const employeeModel = require('./model.employees')
        this.employeeModelObj = new employeeModel()

        const departmentEmployeeModel = require('./model.department.employee')
        this.departmentEmployeeMapModel = new departmentEmployeeModel()

        this.Model.belongsToMany(this.employeeModelObj.Model, {through : this.departmentEmployeeMapModel.Model, foreignKey : 'dept_no', otherKey : 'emp_no'})
        return this.employeeModelObj
    }

    getDepartmentDetails(dept_no) {
        let departmentManagerMapTable = this.associateWithDepartmentManager()
        let employeeTable = departmentManagerMapTable.associateWithEmployees()
        let employeeMapTable = this.associateWithDepartmentEmployee()
        return this.Model.findAll({
            attributes : ['dept_no', 'dept_name'],
            where : {dept_no : dept_no},
            include : {
                model : departmentManagerMapTable.Model,
                attributes : ['emp_no', 'from_date', 'to_date'],
                where : {dept_no : dept_no},
                include : {
                    model : employeeTable.Model,
                    attributes : ['birth_date', 'first_name', 'last_name', 'gender', 'hire_date']
                }
            },
            include : {
                model : employeeMapTable.Model,
                attributes : ['birth_date', 'first_name', 'last_name', 'gender', 'hire_date'],
            }
        })
    }

    associateWithEmployeeAndSalary() {
        const departmentEmployeeModel = require('./model.department.employee')
        this.departmentEmployeeMapModel = new departmentEmployeeModel()

        const salaryModel = require('./model.salary')
        this.salaryModelObj = new salaryModel()

        this.Model.belongsToMany(this.salaryModelObj.Model, {through : this.departmentEmployeeMapModel.Model, foreignKey : 'dept_no', otherKey : 'emp_no'})

        // this.Model.hasMany(this.salaryModelObj.Model, {foreignKey : 'emp_no', sourceKey : 'emp_no'})
        return this.salaryModelObj
    }

    getDepartmentWiseExpense() {
        let salaryTable = this.associateWithEmployeeAndSalary()
        return this.Model.findAll({
            attributes : ['dept_no', 'dept_name'],
            include : {
                model : salaryTable.Model,
                attributes: [
                    [this.connection.sequelize.fn('sum', this.connection.sequelize.col('salary')), 'total_salary'],
                    [this.connection.sequelize.fn('avg', this.connection.sequelize.col('salary')), 'avg_salary']
                  ]
            },
            group : ['dept_no']
        })
    }
}

module.exports = departmentModel