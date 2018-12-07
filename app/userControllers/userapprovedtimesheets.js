/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userapprovedtimesheetsDetailsModel = mongoose.model('userapprovedtimesheetsDetails');
userapprovedtimesheetsFromConfig=require('../fromConfig/userapprovedtimesheets.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/userapprovedtimesheetsJsonConfig', function (req, res) {
    res.send(userapprovedtimesheetsFromConfig);
});

router.post('/userapprovedtimesheetsDetails', function(req, res, next) {
    var newuserapprovedtimesheetsDetails = new userapprovedtimesheetsDetailsModel(req.body);
    newuserapprovedtimesheetsDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("userapprovedtimesheets Details added sucessfully");
    });

})

router.get('/userapprovedtimesheetsDetails/count', function (req, res){
    userapprovedtimesheetsDetailsModel.count(function(err,userapprovedtimesheetsCount){
        if(err)
            res.send(err);
        var count = {userapprovedtimesheetsCount: userapprovedtimesheetsCount};
        res.send(count);
    });
})

router.get('/userapprovedtimesheetsDetails/:start/:range', function (req, res) {
    console.log("server side")
    userapprovedtimesheetsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/userapprovedtimesheetsDetails/:id', function (req, res){
    userapprovedtimesheetsDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' userapprovedtimesheetsDetails   Deleted')
    });
})

router.get('/userapprovedtimesheetsDetails', function (req, res) {
    userapprovedtimesheetsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userapprovedtimesheetsDetails/update', function (req, res) {
    userapprovedtimesheetsDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/userapprovedtimesheetsDetails/:userapprovedtimesheetsId', function (req, res) {
    console.log(req.params.userapprovedtimesheetsId)
    userapprovedtimesheetsDetailsModel.find({_id:req.params.userapprovedtimesheetsId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userapprovedtimesheetsDetails/Name', function (req, res) {
    userapprovedtimesheetsDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/userapprovedtimesheetsDetailsName', function (req, res) {
    userapprovedtimesheetsDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
