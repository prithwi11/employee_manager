'use Strict'
const { DataTypes } = require('sequelize')
const Model = require('./model')

class employeeModel extends Model {
    constructor() {
        super(
            'employees',
            {
                emp_no : {
                    type : DataTypes.INTEGER,
                    primaryKey : true,
                },
                birth_date : {
                    type : DataTypes.DATE
                },
                first_name : {
                    type : DataTypes.STRING
                },
                last_name : {
                    type : DataTypes.STRING
                },
                gender : {
                    type : DataTypes.ENUM,
                    values : ['M', 'F'],
                },
                hire_date : {
                    type : DataTypes.DATE
                }
            },
            {
                timestamps : false,
                freezeTableName : true
            }
        )
    }

    associateWithSalary() {
        const salaryModel = require('./model.salary')
        this.salaryModelObj = new salaryModel()

        this.Model.hasMany(this.salaryModelObj.Model, {foreignKey : 'emp_no'})
        return this.salaryModelObj
    }

    getEmployeeSalaryDetails(employeeId) {
        let employeeTable = this.associateWithSalary()
        return this.Model.findAll({
            attributes : ['emp_no'],
            where : {emp_no : employeeId},
            include : {
                model : employeeTable.Model,
                attributes : ['salary', 'from_date', 'to_date'],
                where : {emp_no : employeeId}
            },
            raw : true
        })
    }
}
module.exports = employeeModel