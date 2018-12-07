/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    languageDetailsModel = mongoose.model('languageDetails');
languageFromConfig=require('../fromConfig/language.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/languageJsonConfig', function (req, res) {
    res.send(languageFromConfig);
});

router.post('/languageDetails', function(req, res, next) {
    var newlanguageDetails = new languageDetailsModel(req.body);
    newlanguageDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("language Details added sucessfully");
    });

})

router.get('/languageDetails/count', function (req, res){
    languageDetailsModel.count(function(err,languageCount){
        if(err)
            res.send(err);
        var count = {languageCount: languageCount};
        res.send(count);
    });
})

router.get('/languageDetails/:start/:range', function (req, res) {
    console.log("server side")
    languageDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/languageDetails/:id', function (req, res){
    languageDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' languageDetails   Deleted')
    });
})

router.get('/languageDetails', function (req, res) {
    languageDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/languageDetails/update', function (req, res) {
    languageDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/languageDetails/:languageId', function (req, res) {
    console.log(req.params.languageId)
    languageDetailsModel.find({_id:req.params.languageId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/languageDetails/Name', function (req, res) {
    languageDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/languageDetailsName', function (req, res) {
    languageDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
