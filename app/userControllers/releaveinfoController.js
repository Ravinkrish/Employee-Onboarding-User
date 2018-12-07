var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    releavemodel = mongoose.model('releaveinfo');

module.exports = function (app){
    app.use('/', router);
};


router.post('/releaveinfo', function(req, res) {
    var newreleavemodel = new releavemodel(req.body);
    newreleavemodel.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("releaveinfo Details added sucessfully");
    });

})


router.get('/discussionInfo/:employeeid', function(req, res) {

    releavemodel.find({employeeid:req.params.employeeid},{employeeid:1,discussionDate:1},function(err,result) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(result);
    });

})


router.get('/approvedEmployeeInfo/:employeeid', function(req, res) {

    releavemodel.findOne({employeeid:req.params.employeeid},{releaveEndDate:1,releaveStartDate:1,employeeid:1},function(err,result) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        console.log(result);
        res.send(result);
    });

})








