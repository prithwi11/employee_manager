'use Strict'
const { DataTypes } = require('sequelize')
const Model = require('./model')

class salaryModel extends Model {
    constructor() {
        super(
            'salaries',
            {
                emp_no : {
                    type : DataTypes.INTEGER,
                    primaryKey : true
                },
                salary : {
                    type : DataTypes.INTEGER
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
module.exports = salaryModel