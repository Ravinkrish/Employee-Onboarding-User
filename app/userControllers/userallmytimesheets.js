/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userallmytimesheetsDetailsModel = mongoose.model('userallmytimesheetsDetails');
userallmytimesheetsFromConfig=require('../fromConfig/userallmytimesheets.json')
schemaUtility=require('../utility').fromSchema
employeeDetailsModel = mongoose.model('employeeDetails'),
moment = require('moment');


module.exports = function (app){
    app.use('/', router);
};

router.get('/userallmytimesheetsJsonConfig', function (req, res) {
    res.send(userallmytimesheetsFromConfig);
});

router.post('/userallmytimesheetsDetails', function(req, res, next) {
    var newuserallmytimesheetsDetails = new userallmytimesheetsDetailsModel(req.body);
    newuserallmytimesheetsDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("userallmytimesheets Details added sucessfully");
    });

})

router.get('/userallmytimesheetsDetails/count', function (req, res){
    userallmytimesheetsDetailsModel.count(function(err,userallmytimesheetsCount){
        if(err)
            res.send(err);
        var count = {userallmytimesheetsCount: userallmytimesheetsCount};
        res.send(count);
    });
})

router.get('/userallmytimesheetsDetails/:start/:range', function (req, res) {
    console.log("server side")
    userallmytimesheetsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/userallmytimesheetsDetails/:id', function (req, res){
    userallmytimesheetsDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' userallmytimesheetsDetails   Deleted')
    });
})

router.get('/userallmytimesheetsDetails', function (req, res) {
    userallmytimesheetsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userallmytimesheetsDetails/update', function (req, res) {
    userallmytimesheetsDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/userallmytimesheetsDetails/:userallmytimesheetsId', function (req, res) {
    console.log(req.params.userallmytimesheetsId)
    userallmytimesheetsDetailsModel.find({_id:req.params.userallmytimesheetsId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userallmytimesheetsDetails/Name', function (req, res) {
    userallmytimesheetsDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/userallmytimesheetsDetailsName', function (req, res) {
    userallmytimesheetsDetailsModel.find({},{"_id":0,"Name":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userdailytask', function(req, res, next) {
console.log(req.body);

    var newuserallmytimesheetsDetailsModel = new userallmytimesheetsDetailsModel(req.body);

    newuserallmytimesheetsDetailsModel.save(function(err,result) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("task added successfully");
    });


});

router.get('/alltheuserDailyTask',function(req,res){
userallmytimesheetsDetailsModel.find({},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})

})

router.get('/alltheuserdailytaskbytodaydate',function(req,res){
var formattedDate= new Date(Date.now() - 86400000);
console.log(formattedDate);
var yesterdaydate = moment(formattedDate).format('DD.MM.YYYY');
//
var d = new Date();
var todaydate = moment(d).format('DD.MM.YYYY');
console.log(yesterdaydate);
console.log(todaydate);
userallmytimesheetsDetailsModel.find({ "$or": [{"date":todaydate},{"date":yesterdaydate}]},function(err,result){
//userDailyTaskDetailsModel.find({},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})

})


router.get('/allthetaskByEmployeeId/:employeeid',function(req,res){
userallmytimesheetsDetailsModel.find({Employeeid:req.params.employeeid},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})

})



router.get('/userdilytaskbydate/:date',function(req,res){
userallmytimesheetsDetailsModel.find({"date":req.params.date},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})

})



router.post('/updateUserDailyTaskByMongodId/:mongoid',function(req,res){
userallmytimesheetsDetailsModel.findOneAndUpdate({"_id":req.params.mongoid},req.body,{upsert: true, new: true},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})

})

router.post('/updateUserDailyTaskByDateEmployeeid/:date/:employeeid',function(req,res){
userallmytimesheetsDetailsModel.findOneAndUpdate({"date":req.params.date,"Employeeid":req.params.employeeid},req.body,{upsert: true, new: true},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})

})


router.delete('/deleteUserDailyTaskByMongodid/:mongoid',function(req,res){
userallmytimesheetsDetailsModel.remove({'_id':req.params.mongoid},function(err,result){
if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})
})


router.post('/approveEmployeeDailyTask/:mongoid',function(req,res){
userallmytimesheetsDetailsModel.findOneAndUpdate({_id:req.params.employeeid},{"isapproved":true},{upsert: true, new: true},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})


})



router.get('/approveEmployeeDailyTaskByEmployeeId/:employeeid',function(req,res){
userallmytimesheetsDetailsModel.find({Employeeid:req.params.employeeid,"isapproved":true},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})


})




router.get('/disapproveEmployeeDailyTaskByEmployeeId/:employeeid',function(req,res){
userallmytimesheetsDetailsModel.find({Employeeid:req.params.employeeid,"isapproved":false},function(err,result){
 if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
})


})


