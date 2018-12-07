/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    projectclientDetailsModel = mongoose.model('projectclientDetails');
projectclientFromConfig=require('../fromConfig/projectclient.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/projectclientJsonConfig', function (req, res) {
console.log(projectclientFromConfig);
    res.send(projectclientFromConfig);
});

router.post('/projectclientDetails', function(req, res, next) {
    var newprojectclientDetails = new projectclientDetailsModel(req.body);
    newprojectclientDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("Client Details added sucessfully");
    });

})

router.get('/projectclientDetails/count', function (req, res){
    projectclientDetailsModel.count(function(err,projectclientCount){
        if(err)
            res.send(err);
        var count = {projectclientCount: projectclientCount};
        res.send(count);
    });
})

router.get('/projectclientDetails/:start/:range', function (req, res) {
    console.log("server side")
    projectclientDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/projectclientDetails/:id', function (req, res){
    projectclientDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send('projectclientDetails   Deleted')
    });
})

router.get('/projectclientDetails', function (req, res) {
    projectclientDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/projectclientDetails/update', function (req, res) {
    projectclientDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/projectclientDetails/:projectclientId', function (req, res) {
    console.log(req.params.clientId)
    projectclientDetailsModel.find({_id:req.params.projectclientId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/projectclientDetails/Name', function (req, res) {
    projectclientDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/projectclientDetailsName', function (req, res) {
    projectclientDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})
