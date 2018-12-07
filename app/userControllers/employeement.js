/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    employeementDetailsModel = mongoose.model('employeementDetails');
employeementFromConfig=require('../fromConfig/employeement.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/employeementJsonConfig', function (req, res) {
    res.send(employeementFromConfig);
});

router.post('/employeementDetails', function(req, res, next) {
    var newemployeementDetails = new employeementDetailsModel(req.body);
    newemployeementDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("employeement Details added sucessfully");
    });

})

router.get('/employeementDetails/count', function (req, res){
    employeementDetailsModel.count(function(err,employeementCount){
        if(err)
            res.send(err);
        var count = {employeementCount: employeementCount};
        res.send(count);
    });
})

router.get('/employeementDetails/:start/:range', function (req, res) {
    console.log("server side")
    employeementDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/employeementDetails/:id', function (req, res){
    employeementDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' employeementDetails   Deleted')
    });
})

router.get('/employeementDetails', function (req, res) {
    employeementDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/employeementDetails/update', function (req, res) {
    employeementDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/employeementDetails/:employeementId', function (req, res) {
    console.log(req.params.employeementId)
    employeementDetailsModel.find({_id:req.params.employeementId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/employeementDetails/Name', function (req, res) {
    employeementDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/employeementDetailsName', function (req, res) {
    employeementDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
