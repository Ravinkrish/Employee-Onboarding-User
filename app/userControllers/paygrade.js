/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    payGradeDetailsModel = mongoose.model('payGradeDetails');
payGradeFromConfig=require('../fromConfig/paygrade.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/payGradeJsonConfig', function (req, res) {
    res.send(payGradeFromConfig);
});

router.post('/payGradeDetails', function(req, res, next) {
console.log("paygradedetails");
               console.log(req.body);
    var newpayGradeDetails = new payGradeDetailsModel(req.body);
    newpayGradeDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("payGrade Details added sucessfully");
    });

})

router.get('/payGradeDetails/count', function (req, res){
    payGradeDetailsModel.count(function(err,payGradeCount){
        if(err)
            res.send(err);
        var count = {payGradeCount: payGradeCount};
        res.send(count);
    });
})

router.get('/payGradeDetails/:start/:range', function (req, res) {
    console.log("server side")
    payGradeDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/payGradeDetails/:id', function (req, res){
    payGradeDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' payGradeDetails   Deleted')
    });
})

router.get('/payGradeDetails', function (req, res) {
    payGradeDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/payGradeDetails/update', function (req, res) {
    payGradeDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/payGradeDetails/:payGradeId', function (req, res) {
    console.log(req.params.payGradeId)
    payGradeDetailsModel.find({_id:req.params.payGradeId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/payGradeDetails/Name', function (req, res) {
    payGradeDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/payGradeDetailsName', function (req, res) {
    payGradeDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
