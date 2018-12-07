/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    educationDetailsModel = mongoose.model('educationDetails');
educationFromConfig=require('../fromConfig/quali-education.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/educationJsonConfig', function (req, res) {
    res.send(educationFromConfig);
});

router.post('/educationDetails', function(req, res, next) {
    var neweducationDetails = new educationDetailsModel(req.body);
    neweducationDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("education Details added sucessfully");
    });

})

router.get('/educationDetails/count', function (req, res){
    educationDetailsModel.count(function(err,educationCount){
        if(err)
            res.send(err);
        var count = {educationCount: educationCount};
        res.send(count);
    });
})

router.get('/educationDetails/:start/:range', function (req, res) {
    console.log("server side")
    educationDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/educationDetails/:id', function (req, res){
    educationDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' educationDetails   Deleted')
    });
})

router.get('/educationDetails', function (req, res) {
    educationDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/educationDetails/update', function (req, res) {
    educationDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/educationDetails/:educationId', function (req, res) {
    console.log(req.params.educationId)
    educationDetailsModel.find({_id:req.params.educationId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/educationDetails/Name', function (req, res) {
    educationDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/educationDetailsName', function (req, res) {
    educationDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
