var express = require('express');
var router = express.Router();
var propertyModel = require('../models/property');
var authConfig = require('../config/appConfig');
var jwt = require('../node_modules/jsonwebtoken');
//const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

router.get("/1",function (req, res, next) {

    let url = 'https://housing.com/in/buy/search?f=eyJiYXNlIjpbeyJ0eXBlIjoiUE9MWSIsInV1aWQiOiIzOTkzZjkwYjViYzkwZGM4YzdkYiIsImxhYmVsIjoiSi4gUC4gTmFnYXIifSx7InR5cGUiOiJQT0xZIiwidXVpZCI6ImEyNzNjNGMzYmUwZWU4YjM2NjlmIiwibGFiZWwiOiJXaGl0ZWZpZWxkIn0seyJ0eXBlIjoiUE9MWSIsInV1aWQiOiIwMTM2ZGU5YzEyYzA1ZmM2YTdhOSIsImxhYmVsIjoiRWxlY3Ryb25pYyBDaXR5In1dLCJ2IjoyLCJzIjoiZCJ9';
    //let url = 'www.google.com';
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function (error, response, html){

        console.log(url);
        // First we'll check to make sure no errors occurred when making the request
        let listing = [];
        var props = new propertyModel();
        if (!error) {
            var $ = cheerio.load(html);
            for (let index = 0; index <
                $('.infinite-loader>.infi-item-wrapper>.list-item-container>.list-card-item').length; index++) {
                const ele = $('.infinite-loader>.infi-item-wrapper>.list-item-container>.list-card-item')[index];
               //console.log(ele);
                let prop = {};
                prop.imgUrl = $($(ele).find('.lst-img-container>.lst-img')[0]).css('background-image').replace('url(', '').replace(')', '').replace('"', '');
                prop.name = $($(ele).find('.lst-dtls>.lst-heading>.lst-title')[0]).text()
                prop.cost = $($($('.infinite-loader')[0]).find('.lst-dtls>.lst-price-cnfg>.lst-price>.price-txt')[0]).text();
                // if (prop.cost.toString().indexOf('Lacs') > -1) {
                //     prop.cost = Number(prop.cost.replace('Lacs', '')) * 100000;
                // }
                // if (prop.cost.toString().indexOf('Cr') > -1) {
                //     prop.cost = Number(prop.cost.replace('Cr', '')) * 10000000;
                // }
                const qtyType = $($($(ele).find('.lst-dtls>.lst-middle-section>div>.lst-sub-title '))[0]).text();
                if (qtyType == 'Configs') {

                    prop.propertyType = $($($(ele).find('.lst-dtls>.lst-middle-section>div>.lst-sub-value'))[0]).text()
                }
                if (qtyType == 'Built Up Area') {
                    prop.area = $($($(ele).find('.lst-dtls>.lst-middle-section>div>.lst-sub-value'))[0]).text()
                }

                prop.locality = $($($(ele).find('.lst-dtls>.lst-heading>.lst-loct>span '))[0]).text()
                prop.builder = $($($(ele).find('.lst-dtls>.lst-contact>.cntc-section>.lst-cntct-dtls>.lst-cntct-title>.cntct-link>span '))[0]).text()
                //console.log(prop);
                listing.push(prop);
            }
            for (let index = 0; index < listing.length; index++) {
                listing[index].propertyId = index;
            }
            // Finally, we'll define the variables we're going to capture
            propertyModel.insertMany(listing, function (err,result) {
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
                console.log(result.insertedCount + " documents inserted");
             });
            // var title, release, rating;
            // var json = { title: "", release: "", rating: "" };
            // res.status(201).json({
            //     message : 'Saved Coontact',
            //     obj : {"data":listing}
            //   });   
        }
    });

    
});

router.get("/2",function (req, res, next) {
    let url = 'https://www.commonfloor.com/listing-search?city=Bangalore&search_intent=sale&polygon=1&page=1&page_size=30';
    //let url = 'www.google.com';
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(url, function (error, response, html) {
        console.log(url);
        // First we'll check to make sure no errors occurred when making the request
        let listing = [];
        var props = new propertyModel();
        if (!error) {
             // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

             var $ = cheerio.load(html);
             for (let index = 0; index < $('.snb-tile').length; index++) {
                 const ele = $('.snb-tile')[index];
                 //console.log(ele);
                 //let prop = {};
                 let prop = new propertyModel();
                 prop.imgUrl = $($($(ele).find('img'))[0]).attr('data-src');
                 prop.name = $($(ele).find('.snb-tile .snb-tile-info h4 a')[0]).text()
                 prop.cost = $($(ele).find('.infodata span')[0]).text()
                //  if (prop.cost.toString().indexOf('L') > -1) {
                //      prop.cost = Number(prop.cost.replace('L', '')) * 100000;
                //  }
                //  if (prop.cost.toString().indexOf('Cr') > -1) {
                //      prop.cost = Number(prop.cost.replace('Cr', '')) * 10000000;
                //  }
                 const title = $($(ele).find('.snb-tile-info a')[0]).text().split(' in ');
                 prop.propertyType = title[0];
                 prop.area = $($(ele).find('.infodata span')[1]).text().trim().split('sq.ft')[0].trim()
                 prop.locality = title[1];
                 prop.builder = $($(ele).find('.infownertext small')[0]).text()
                 //console.log(prop);
                 listing.push(prop);
             }
             for (let index = 0; index < listing.length; index++) {
                 listing[index].propertyId = index;
             }
             // Finally, we'll define the variables we're going to capture
             propertyModel.insertMany(listing, function (err,result) {
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

                console.log(result.insertedCount + " documents inserted");
             });

            // var title, release, rating;
            // var json = { title: "", release: "", rating: "" };
            // res.status(201).json({
            //     message : 'Saved Coontact',
            //     obj : {"data":listing}
            //   });
        }     
    });
});

module.exports = router;

