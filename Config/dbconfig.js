const Sequelize=require('sequelize');
const connection=require('./connection.json');
const database=new Sequelize({
    host:connection.host,
    username:connection.user,
    database:connection.database,
    password:connection.password,
    dialect:connection.dialect
});

module.exports=database;