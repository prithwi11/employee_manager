'use Strict'
const { DataTypes } = require('sequelize')
const Model = require('./model')

class departmentManagerMapModel extends Model { 
    constructor() {
        super(
            'dept_manager',
            {
                emp_no : {
                    type : DataTypes.INTEGER,
                    primaryKey : true
                },
                dept_no : {
                    type : DataTypes.CHAR
                },
                from_date : {
                    type : DataTypes.DATE
                },
                to_date : {
                    type : DataTypes.DATE
                }
            },
            {
                timestamps : false,
                freezeTableName : true,
            }
        )
    }

    associateWithEmployees() {
        const employeeModel = require('./model.employees')
        this.employeeModelObj = new employeeModel()

        this.Model.belongsTo(this.employeeModelObj.Model, {foreignKey : 'emp_no'})
        return this.employeeModelObj
    }
}

module.exports = departmentManagerMapModel