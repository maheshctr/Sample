var express = require('express');
var router = express.Router();
var user = require('../models/user');
var authConfig = require('../config/appConfig');
var jwt = require('../node_modules/jsonwebtoken');

router.post('/login',function (req, res, next) {
    var userObj = {"userName" : req.body.userName,"password": req.body.password};
    var query = {"userName" : userObj.userName};
    user.findOne( query, function (err, result) {
        if(err)
        {
            res.status(500).render('error', { message: JSON.stringify(err) });
        }

        if(!result)
        {
            res.status(404).json({ 
                message: 'User not found',
                obj : ''
            });
        }
        else
        {
            if (result.password != userObj.password) 
            {
                res.status(401).json({
                    message: 'Auth failed',
                    obj : {'auth' : false, token : null}
                });
            }
            else
            {
                var token = jwt.sign({ id: result.userName }, authConfig.auth.secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                res.status(200).send
                ({ 
                    message: 'Auth failed',
                    obj : {'auth' : true, token : token, data : result}
                });
            }
        }

    });
});

router.post('/register',function (req,res,next) {
   var userObj = new user
   ({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    userName : req.body.userName,
    email : req.body.email,
    password : req.body.password,
    createdDateTime : new Date(),
    lastUpdatedDateTime : new Date(),
    status : true
   });
   userObj.save(function (err, result) 
   {
       if(err)
       {
        return res.status(500).json({
            title : 'An error occurred',
            error : err
          });
       }

       res.status(201).json({
        contact : 'Saved Coontact',
        obj : result
      });

   });
});



module.exports = router;