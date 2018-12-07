/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    qualificationDetailsModel = mongoose.model('qualificationDetails');
qualificationFromConfig=require('../fromConfig/qualification.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/qualificationJsonConfig', function (req, res) {
    res.send(qualificationFromConfig);
});

router.post('/qualificationDetails', function(req, res, next) {
    var newqualificationDetails = new qualificationDetailsModel(req.body);
    newqualificationDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("qualification Details added sucessfully");
    });

})

router.get('/qualificationDetails/count', function (req, res){
    qualificationDetailsModel.count(function(err,qualificationCount){
        if(err)
            res.send(err);
        var count = {qualificationCount: qualificationCount};
        res.send(count);
    });
})

router.get('/qualificationDetails/:start/:range', function (req, res) {
    console.log("server side")
    qualificationDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/qualificationDetails/:id', function (req, res){
    qualificationDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send('qualificationDetails   Deleted')
    });
})

router.get('/qualificationDetails', function (req, res) {
    qualificationDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/qualificationDetails/update', function (req, res) {
    qualificationDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/qualificationDetails/:qualificationId', function (req, res) {
    console.log(req.params.qualificationId)
    qualificationDetailsModel.find({_id:req.params.qualificationId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/qualificationDetails/Name', function (req, res) {
    qualificationDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/qualificationDetailsName', function (req, res) {
    qualificationDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
