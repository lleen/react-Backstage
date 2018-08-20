//调用模块
const mongodb = require('./mongodb');
const mysql = require('./mysql');

//暴露模块
module.exports = {
    mongodb,
    mysql,
}