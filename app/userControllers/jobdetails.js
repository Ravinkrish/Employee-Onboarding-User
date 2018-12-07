/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    jobdetailsDetailsModel = mongoose.model('jobDetails');
jobdetailsFromConfig=require('../fromConfig/jobdetails.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/jobdetailsJsonConfig', function (req, res) {
    res.send(jobdetailsFromConfig);
});

router.post('/jobdetailsDetails', function(req, res, next) {
    var newjobdetailsDetails = new jobdetailsDetailsModel(req.body);
    newjobdetailsDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("Client Details added sucessfully");
    });

})

router.get('/jobdetailsDetails/count', function (req, res){
    jobdetailsDetailsModel.count(function(err,jobdetailsCount){
        if(err)
            res.send(err);
        var count = {jobdetailsCount: jobdetailsCount};
        res.send(count);
    });
})

router.get('/jobdetailsDetails/:start/:range', function (req, res) {
    console.log("server side")
    jobdetailsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/jobdetailsDetails/:id', function (req, res){
    jobdetailsDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send('jobdetailsDetails   Deleted')
    });
})

router.get('/jobdetailsDetails', function (req, res) {
    jobdetailsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/jobdetailsDetails/update', function (req, res) {
    jobdetailsDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/jobdetailsDetails/:jobdetailsId', function (req, res) {
    console.log(req.params.clientId)
    jobdetailsDetailsModel.find({_id:req.params.jobdetailsId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/jobdetailsDetails/Name', function (req, res) {
    jobdetailsDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{

            res.send(result)
        }

    })
})


router.get('/jobdetailsDetailsName', function (req, res) {
    jobdetailsDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
