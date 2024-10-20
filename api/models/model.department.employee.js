'use Strict'
const { DataTypes } = require('sequelize')
const Model = require('./model')

class departmentEmployeeMapModel extends Model { 
    constructor() {
        super(
            'dept_emp',
            {
                emp_no : {
                    type : DataTypes.INTEGER,
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
                freezeTableName : true
            }
        )
    }
}

module.exports = departmentEmployeeMapModel