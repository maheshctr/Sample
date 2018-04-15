var moongoose = require('../config/mongo');
var autoIncrement = require('mongoose-auto-increment');

var Schema = moongoose.Schema;

var Property = new Schema
({
    //propertyId : Number,
    name : String,
    cost : String,
    imgUrl : String,
    propertyType : String,
    area : String,
    locality : String,
    builder : String
});

//Property.plugin(autoIncrement.plugin, {model : 'Property', field : 'propertyId', startAt : 1});

module.exports = moongoose.model('Property', Property);