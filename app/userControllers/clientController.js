/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    clientDetailsModel = mongoose.model('ClientDetails');
//    headlevel=mongoose.model('headandlevel');
ClientFromConfig=require('../fromConfig/clients.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/ClientJsonConfig', function (req, res) {
    res.send(ClientFromConfig);
});

//router.post('/companyheadlevel',function(req,res,next){
//clientDetailsModel.save(function(err){
//if(err){
//console.log('error in saving'+err);
//}
//res.send("head added");
//});
//
//})

router.post('/ClientDetails', function(req, res, next) {
    var newClientDetails = new clientDetailsModel(req.body);
    console.log(req.body);
    newClientDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("Client Details added sucessfully");

    });

})

router.get('/ClientDetails/count', function (req, res){
    clientDetailsModel.count(function(err,clientCount){
        if(err)
            res.send(err);
        var count = {clientCount: clientCount};
        res.send(count);
    });
})

router.get('/ClientDetails/:start/:range', function (req, res) {
    console.log("server side")
    clientDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/ClientDetails/:id', function (req, res){
    clientDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' clientDetails   Deleted')
    });
})

router.get('/ClientDetails', function (req, res) {
    clientDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/ClientDetails/update', function (req, res) {
    clientDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/ClientDetails/:clientId', function (req, res) {
    console.log(req.params.clientId)
    clientDetailsModel.find({_id:req.params.clientId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/ClientDetails/Name', function (req, res) {
    clientDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{

            res.send(result)
        }

    })
})


router.get('/ClientDetailsName', function (req, res) {
    clientDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.get('/Clientlevelhead', function (req, res) {
    clientDetailsModel.find({},{"_id":0,"Name":1,"level":1,"Heads":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
//         console.log(result)
            res.send(result)
        }

    })
})


