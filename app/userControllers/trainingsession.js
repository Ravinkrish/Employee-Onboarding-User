/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    trainsessionDetailsModel = mongoose.model('trainsessionDetails');
trainsessionFromConfig=require('../fromConfig/trainingsession.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/trainsessionJsonConfig', function (req, res) {
    res.send(trainsessionFromConfig);
});

router.post('/trainsessionDetails', function(req, res, next) {
    var newtrainsessionDetails = new trainsessionDetailsModel(req.body);
    newtrainsessionDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("trainsession Details added sucessfully");
    });

})

router.get('/trainsessionDetails/count', function (req, res){
    trainsessionDetailsModel.count(function(err,trainsessionCount){
        if(err)
            res.send(err);
        var count = {trainsessionCount: trainsessionCount};
        res.send(count);
    });
})

router.get('/trainsessionDetails/:start/:range', function (req, res) {
    console.log("server side")
    trainsessionDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/trainsessionDetails/:id', function (req, res){
    trainsessionDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' trainsessionDetails   Deleted')
    });
})

router.get('/trainsessionDetails', function (req, res) {
    trainsessionDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/trainsessionDetails/update', function (req, res) {
    trainsessionDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/trainsessionDetails/:trainsessionId', function (req, res) {
    console.log(req.params.trainsessionId)
    trainsessionDetailsModel.find({_id:req.params.trainsessionId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/trainsessionDetails/Name', function (req, res) {
    trainsessionDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/trainsessionDetailsName', function (req, res) {
    trainsessionDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
