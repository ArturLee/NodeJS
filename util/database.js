const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'Shop',
    'root',
    'arturlee', 
    {dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;