/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    certificationDetailsModel = mongoose.model('certificationDetails');
certificationFromConfig=require('../fromConfig/certification.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/certificationJsonConfig', function (req, res) {
    res.send(certificationFromConfig);
});

router.post('/certificationDetails', function(req, res, next) {
    var newcertificationDetails = new certificationDetailsModel(req.body);
    newcertificationDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("certification Details added sucessfully");
    });

})

router.get('/certificationDetails/count', function (req, res){
    certificationDetailsModel.count(function(err,certificationCount){
        if(err)
            res.send(err);
        var count = {certificationCount: certificationCount};
        res.send(count);
    });
})

router.get('/certificationDetails/:start/:range', function (req, res) {
    console.log("server side")
    certificationDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/certificationDetails/:id', function (req, res){
    certificationDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' certificationDetails   Deleted')
    });
})

router.get('/certificationDetails', function (req, res) {
    certificationDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/certificationDetails/update', function (req, res) {
    certificationDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/certificationDetails/:certificationId', function (req, res) {
    console.log(req.params.certificationId)
    certificationDetailsModel.find({_id:req.params.certificationId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/certificationDetails/Name', function (req, res) {
    certificationDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/certificationDetailsName', function (req, res) {
    certificationDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
