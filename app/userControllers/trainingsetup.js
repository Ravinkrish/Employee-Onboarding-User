/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    trainingsetupDetailsModel = mongoose.model('trainingsetupDetails');
trainingsetupFromConfig=require('../fromConfig/trainingsetup.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/trainingsetupJsonConfig', function (req, res) {
    res.send(trainingsetupFromConfig);
});

router.post('/trainingsetupDetails', function(req, res, next) {
    var newtrainingsetupDetails = new trainingsetupDetailsModel(req.body);
    newtrainingsetupDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("trainingsetup Details added sucessfully");
    });

})

router.get('/trainingsetupDetails/count', function (req, res){
    trainingsetupDetailsModel.count(function(err,trainingsetupCount){
        if(err)
            res.send(err);
        var count = {trainingsetupCount: trainingsetupCount};
        res.send(count);
    });
})

router.get('/trainingsetupDetails/:start/:range', function (req, res) {
    console.log("server side")
    trainingsetupDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/trainingsetupDetails/:id', function (req, res){
    trainingsetupDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send('trainingsetupDetails   Deleted')
    });
})

router.get('/trainingsetupDetails', function (req, res) {
    trainingsetupDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/trainingsetupDetails/update', function (req, res) {
    trainingsetupDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/trainingsetupDetails/:trainingsetupId', function (req, res) {
    console.log(req.params.trainingsetupId)
    trainingsetupDetailsModel.find({_id:req.params.trainingsetupId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/trainingsetupDetails/Name', function (req, res) {
    trainingsetupDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/trainingsetupDetailsCourse', function (req, res) {
    trainingsetupDetailsModel.find({},{"_id":0,"Course":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
