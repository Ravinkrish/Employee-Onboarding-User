/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userpendingtimesheetsDetailsModel = mongoose.model('userpendingtimesheetsDetails');
userpendingtimesheetsFromConfig=require('../fromConfig/userpendingtimesheets.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/userpendingtimesheetsJsonConfig', function (req, res) {
    res.send(userpendingtimesheetsFromConfig);
});

router.post('/userpendingtimesheetsDetails', function(req, res, next) {
    var newuserpendingtimesheetsDetails = new userpendingtimesheetsDetailsModel(req.body);
    newuserpendingtimesheetsDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("userpendingtimesheets Details added sucessfully");
    });

})

router.get('/userpendingtimesheetsDetails/count', function (req, res){
    userpendingtimesheetsDetailsModel.count(function(err,userpendingtimesheetsCount){
        if(err)
            res.send(err);
        var count = {userpendingtimesheetsCount: userpendingtimesheetsCount};
        res.send(count);
    });
})

router.get('/userpendingtimesheetsDetails/:start/:range', function (req, res) {
    console.log("server side")
    userpendingtimesheetsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/userpendingtimesheetsDetails/:id', function (req, res){
    userpendingtimesheetsDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' userpendingtimesheetsDetails   Deleted')
    });
})

router.get('/userpendingtimesheetsDetails', function (req, res) {
    userpendingtimesheetsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userpendingtimesheetsDetails/update', function (req, res) {
    userpendingtimesheetsDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/userpendingtimesheetsDetails/:userpendingtimesheetsId', function (req, res) {
    console.log(req.params.userpendingtimesheetsId)
    userpendingtimesheetsDetailsModel.find({_id:req.params.userpendingtimesheetsId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userpendingtimesheetsDetails/Name', function (req, res) {
    userpendingtimesheetsDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/userpendingtimesheetsDetailsName', function (req, res) {
    userpendingtimesheetsDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
