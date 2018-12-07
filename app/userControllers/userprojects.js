/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
 userprojectsDetailsModel = mongoose.model('projectDetails');

userprojectsFromConfig=require('../fromConfig/userprojects.json')
schemaUtility=require('../utility').fromSchema
module.exports = function (app){
    app.use('/', router);
};

router.get('/userprojectsJsonConfig', function (req, res) {
console.log(userprojectsFromConfig);
    res.send(userprojectsFromConfig);
});

router.post('/userprojectsDetails', function(req, res, next) {
    var newuserprojectsDetails = new userprojectsDetailsModel(req.body);
    newuserprojectsDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send("userprojects Details added sucessfully");
    });

})

router.get('/userprojectsDetails/count', function (req, res){
    userprojectsDetailsModel.count(function(err,userprojectsCount){
        if(err)
            res.send(err);
        var count = {userprojectsCount: userprojectsCount};
        res.send(count);
    });
})

router.get('/userprojectsDetails/:start/:range', function (req, res) {
    console.log("server side")
    userprojectsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{

            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/userprojectsDetails/:id', function (req, res){
    userprojectsDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' userprojectsDetails   Deleted')
    });
})

router.get('/userprojectsDetails', function (req, res) {
    userprojectsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userprojectsDetails/update', function (req, res) {
    userprojectsDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/userprojectsDetails/:userprojectsId', function (req, res) {
    console.log(req.params.userprojectsId)
    userprojectsDetailsModel.find({_id:req.params.userprojectsId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.post('/userprojectsDetails/Name', function (req, res) {
    userprojectsDetailsModel.find({'Nameoftheproject':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/userprojectsDetailsName', function (req, res) {
    userprojectsDetailsModel.find({},{"_id":0,"Nameoftheproject":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})



router.get('/myProject/:employeeId', function (req, res) {
    console.log(req.params.employeeId)
    userprojectsDetailsModel.find({Employeeid:req.params.employeeId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})



router.get('/myProjectlastmeetup/:employeeid', function (req, res) {
var emp=req.params.employeeid;
    userprojectsDetailsModel.find({},{Employeeid:1,Latestmeetup:1,Clientproject:1,Nameoftheproject:1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
//        console.log(result);
        var employeeresult=[];
        for(var i=0;i<result.length;i++)
        {
           var employee=result[i].Employeeid;
           if(employee.indexOf(emp)> -1) {
           employeeresult.push(result[i]);

           }
        }

    res.send(employeeresult)

        }

    })
})



router.route('/getYearlyProjectStatus')
    .get(function(req,res){
        userprojectsDetailsModel.aggregate([

            {
                '$match': {
                'Projectstartdate':
                    {

                     "$exists":true

                    },
                    $or: [{ Projectstatus: 'Active' }]


                           }


              },




            {$project:
                {

                   "yr":{"$eq":[ { $year:"$Projectstartdate"},{ $year:new Date}]},
                   "mth": { $month:"$Projectstartdate"},


                   "Activestatus":"$Projectstatus"



            }


            },
            {$match:{
              "yr":true
            }
            },

             {$project:
                            {

                               "year": 1,
                               "mth":1,

                               "Activestatus":1
                            }
             }



                        ],function (err, result) {
                if (err) {
                    res.send(err)
                }
                else{
                    res.send(result)
                }

            })


    });




router.route('/getYearlyProjectStatusForActive')
    .get(function(req,res){
        userprojectsDetailsModel.aggregate([

            {
                '$match': {
                'Projectstartdate':
                    {
              "$exists":true
                     },
                    Projectstatus:'Active'
                         }

            },

       {$project:
                {

                 "yr":{"$eq":[ { $year:"$Projectstartdate"},{ $year:new Date}]},
                "mth": { $month:"$Projectstartdate"},
                "Activestatus":"$Projectstatus"
                }

            },

            {$match:{
                          "yr":true
                        }
                        },

                         {$project:
                                        {

                                           "year": 1,
                                           "mth":1,

                                           "Activestatus":1
                                        }
                         }



                        ],function (err, result) {
                if (err) {
                    res.send(err)
                }
                else{
                    res.send(result)
                }

            })


    });



router.route('/getYearlyProjectStatusForInactive')
    .get(function(req,res){
        userprojectsDetailsModel.aggregate([

            {
                '$match': {
                'Projectstartdate':
                    {
              "$exists":true
                     },
                    Projectstatus:'Inactive'
                         }

            },

       {$project:
                {

                   "yr":{"$eq":[ { $year:"$Projectstartdate"},{ $year:new Date}]},
                   "mth": { $month:"$Projectstartdate"},
                   "Activestatus":"$Projectstatus"
                }

            },
            {$match:
                 {
                            "yr":true
                          }
                          },

                           {$project:
                                          {

                                             "year": 1,
                                             "mth":1,

                                             "Activestatus":1
                                          }
                           }



                        ],function (err, result) {
                if (err) {
                    res.send(err)
                }
                else{
                    res.send(result)
                }

            })


    });




router.route('/getYearlyProjectStatusForProduction')
    .get(function(req,res){
        userprojectsDetailsModel.aggregate([

            {
                '$match': {
                'Projectstartdate':
                    {
              "$exists":true
                     },
                    Projectstatus:'Production'
                         }

            },

       {$project:
                {

                   "yr":{"$eq":[ { $year:"$Projectstartdate"},{ $year:new Date}]},
                   "mth": { $month:"$Projectstartdate"},
                   "Activestatus":"$Projectstatus"
                }

            },

            {$match:{
                          "yr":true
                        }
                        },

                         {$project:
                                        {

                                           "year": 1,
                                           "mth":1,

                                           "Activestatus":1
                                        }
                         }



                        ],function (err, result) {
                if (err) {
                    res.send(err)
                }
                else{
                    res.send(result)
                }

            })


    });


router.route('/getYearlyProjectStatusForMaintanence')
    .get(function(req,res){
        userprojectsDetailsModel.aggregate([

            {
                '$match': {
                'Projectstartdate':
                    {
              "$exists":true
                     },
                    Projectstatus:'Maintanence'
                         }

            },

       {$project:
                {

                   "yr":{"$eq":[ { $year:"$Projectstartdate"},{ $year:new Date}]},
                   "mth": { $month:"$Projectstartdate"},
                   "Activestatus":"$Projectstatus"
                }

            },
            {$match:{
                          "yr":true
                        }
                        },

                         {$project:
                                        {

                                           "year": 1,
                                           "mth":1,

                                           "Activestatus":1
                                        }
                         }



                        ],function (err, result) {
                if (err) {
                    res.send(err)
                }
                else{
                    res.send(result)
                }

            })


    });


router.route('/getYearlyProjectStatusForSlack')
    .get(function(req,res){
        userprojectsDetailsModel.aggregate([

            {
                '$match': {
                'Projectstartdate':
                    {
              "$exists":true
                     },
                    Projectstatus:'Slack'
                         }

            },

       {$project:
                {

                   "yr":{"$eq":[ { $year:"$Projectstartdate"},{ $year:new Date}]},
                   "mth": { $month:"$Projectstartdate"},
                   "Activestatus":"$Projectstatus"
                }

            },
            {$match:{
                          "yr":true
                        }
                        },

                         {$project:
                                        {

                                           "year": 1,
                                           "mth":1,

                                           "Activestatus":1
                                        }
                         }



                        ],function (err, result) {
                if (err) {
                    res.send(err)
                }
                else{
                    res.send(result)
                }

            })


    });




router.get('/getAlltheLiveProjectHours', function (req, res) {
    userprojectsDetailsModel.find({"Projectstatus":"Active"},{"Projectstartdate":1,"Projectstatus":1,"Nameoftheproject":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})

router.get('/getAllTheMaintanenceProjectHours', function (req, res) {
    userprojectsDetailsModel.find({"Projectstatus":"Maintanence"},{"Projectstartdate":1,"Projectstatus":1,"Nameoftheproject":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/getNoOfPeopleInTheLiveProject', function (req, res) {
    userprojectsDetailsModel.find({"Projectstatus":"Active"},{"Noofemployees":1,"Nameoftheproject":1,_id:0},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })

})


router.get('/getNoOfPeopleInTheMaintanenceProject', function (req, res) {
    userprojectsDetailsModel.find({"Projectstatus":"Maintanence"},{"Noofemployees":1,"Nameoftheproject":1,_id:0},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })

})




router.get('/getCostPerLiveProject', function (req, res) {
    userprojectsDetailsModel.find({"Projectstatus":"Active"},{"Nameoftheproject":1,"Projectstartdate":1,"CostPerHour":1,_id:0},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })

})


router.get('/getCostPerMaintanenceProject', function (req, res) {
    userprojectsDetailsModel.find({"Projectstatus":"Maintanence"},{"Nameoftheproject":1,"Projectstartdate":1,"CostPerHour":1,_id:0},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })

})



router.get('/getEmployeeAlltheProjectByEmployeeid/:employeeid', function (req, res) {
var emp=req.params.employeeid;
    userprojectsDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
//        console.log(result);
        var employeeresult=[];
        for(var i=0;i<result.length;i++)
        {
           var employee=result[i].Employeeid;
           if(employee.indexOf(emp)> -1) {
           employeeresult.push(result[i]);

           }
        }
    res.send(employeeresult)

        }

    })
})









