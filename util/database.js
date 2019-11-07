const mysql = require('mysql2')

const pool = mysql.createPool({
host: 'localhost',
user: 'root',
database:'Shop',
password: 'arturlee'

})

module.exports = pool.promise();