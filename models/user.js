var moongoose = require('../config/mongo');
var autoIncrement = require('mongoose-auto-increment');

var Schema = moongoose.Schema;

var User = new Schema
({
    userId : Number,
    firstName : String,
    lastName : String,
    userName : String,
    email : String,
    password : String,
    createdDateTime : Date,
    lastUpdatedDateTime : Date,
    status : Boolean
});

User.plugin(autoIncrement.plugin, {model : 'User', field : 'userId', startAt : 1});

module.exports = moongoose.model('User', User);