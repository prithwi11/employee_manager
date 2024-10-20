
class ConnectionClass {
    connectToMYSQL = () => {
        require('dotenv').config();
        const connectionObj = {
            host : process.env.DB_HOST,
            dialect : process.env.DB_DIALECT,
            timezone : process.env.DB_TIMEZONE,
            pool : {
                max : 5,
                min : 0,
                idle : 5000,
                acquire : 15000
            }
        }
        this.Sequelize = require('sequelize')
        this.sequelize = new this.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, connectionObj)
    }
}

module.exports = ConnectionClass
