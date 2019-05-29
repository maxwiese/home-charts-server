var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var config = require('../config')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(config.db.url)
    MongoClient.connect("mongodb://raspberrypi:27017/", function(err, db) {
        
        if (err) {
            res.status(503).json({
                internal_server_error: "connect to database",
                reason: err
            })
            //db.close()        
        }

        db.db('speedtest').collection('speedtest').find().toArray((err, result) => {
            if (err) {
                res.status(503).json({
                    internal_server_error: "find data",
                    reason: err
                }) 
                //db.close()       
            }

            res.status(200).json({data: result})
            //db.close()  
        })       


    })
});

module.exports = router;
