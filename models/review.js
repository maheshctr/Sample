var moongoose = require('../config/mongo');
var autoIncrement = require('mongoose-auto-increment');

var Schema = moongoose.Schema;

var Review = new Schema
({
    id : Number,
    propertyId : String,
    title : String,
    description : String,
    by : String,
    createdDateTime : Date
});

Review.plugin(autoIncrement.plugin, {model : 'Review', field : 'id', startAt : 1});

module.exports = moongoose.model('Review', Review);