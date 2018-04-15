var express = require('express');
var router = express.Router();
var property = require('../models/property');
var authConfig = require('../config/appConfig');
var jwt = require('../node_modules/jsonwebtoken');
//var propService = require("../services/propertyService");

router.post("/",function (req, res, next) { 
    // try 
    // {
    //     next(propService.getProperties(req.body.searchQuery), function (err, data) {
    //         res.status(200).json({
    //             "message" : "Data successfull",
    //             "data" : data
    //         });
    //     });
        
    // }catch (error) 
    // {
    //     console.log(error);
        
    //     res.status(500).json({
    //         "message": "Error occurred plaase contact admin",
    //         "data" : {'auth' : false, token : null}
    //     });   
    // }

    let searchQuery = req.body.searchQuery;
    console.log(searchQuery);
    
    if (searchQuery == "" || searchQuery == null) 
    {
        console.log("indise if");
        
        property.find(function (err, result) 
        {
            if (err) 
            {
                res.status(500).json({
                    "message": "Error occurred plaase contact admin",
                    "data" : err
                });   
            }
            else
            {
                res.status(200).json({
                    "message" : "Data successfull",
                    "data" : result
                });
            }
            
        });    
    } 
    else 
    {
        console.log("indise else");
        //var query = {"name" : req.body.searchQuery};
        var query = {"$text" : {"$search" : searchQuery} }; //exact search
        console.log(query);
        //var query = {"name" : /req.body.searchQuery/};
        property.find(query,function (err, result) 
        {
            if (err) 
            {
                res.status(500).json({
                    "message": "Error occurred plaase contact admin",
                    "data" : err
                });   
            }
            else
            {
                res.status(200).json({
                    "message" : "Data successfull",
                    "data" : result
                });
            }
            
        });    
    }
    








});

module.exports = router;