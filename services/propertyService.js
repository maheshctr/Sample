'use strict';
var property = require('../models/property');
var service = {};

service.getProperties  = function (searchQuery)
{
    var query = {"name" : searchQuery};
    property.find(function (err, result) 
    {
        if (err) 
        {
            console.log(err);
            throw err;
        }
        else
        {
            return result;
        }
        
    });
};

module.exports = service;
// module.exports = {
//     "getProperties" : "getProperties"
// };