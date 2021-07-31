const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin'); //lagou-admin数据库不存在则创建

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
const UsersSchema = mongoose.Schema({
    name: String,
    password:String,
    email:String,
    phone:String
});
const UsersModel = mongoose.model('users', UsersSchema); //创建集合users，没有s就会加s；返回一个model
module.exports = UsersModel




