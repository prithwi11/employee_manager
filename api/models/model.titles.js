'use Strict'
const { DataTypes } = require('sequelize')
const Model = require('./model')

class titleModel extends Model {
    constructor() {
        super(
            'titles',
            {
                emp_no : {
                    type : DataTypes.INTEGER,
                    primaryKey : true
                },
                title : {
                    type : DataTypes.STRING
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

module.exports = titleModel