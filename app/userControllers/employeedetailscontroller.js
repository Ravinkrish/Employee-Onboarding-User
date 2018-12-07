/**
 * Created by zendynamix on 25-11-2016.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    employeeDetailsModel = mongoose.model('employeeDetails'),
employeeFromConfig=require('../fromConfig/employeedetails.json'),
bodyParser = require('body-parser')

schemaUtility=require('../utility').employeeschema
module.exports = function (app){

    app.use('/', router);

};
var nodemailer = require('nodemailer');
//var jquery = require('jquery');
var _ = require('underscore');
//var smtpTransport = require('nodemailer-smtp-transport');
//var


//var urlencodedParser = bodyParser.urlencoded({ extended: true })



router.get('/employeeJsonConfig', function (req, res) {
    res.send(employeeFromConfig);
});

router.post('/employeeDetails', function(req, res, next) {
    var newemployeeDetails = new employeeDetailsModel(req.body);

    newemployeeDetails.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);
        }
        res.send(newemployeeDetails._id);
    });

})




router.post('/employeeskilldetails',function(req,res,next){
console.log(req.body);
console.log(req.body.SkillDetails);
console.log(req.body.Skill);

console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            'Skill':req.body.Skill,
                            'SkillDetails':req.body.SkillDetails
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result);


                              });

        });




router.post('/employeequalificationdetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "Qualification":req.body.Qualification,
                            "InstituteName":req.body.InstituteName,
                            "StartDate":req.body.StartDate,
                            "CompletedOn":req.body.CompletedOn
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result)


                              });

        });
router.post('/employeecertificationdetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "Certification":req.body.Certification,
                            "Institute":req.body.Institute,
                            "GrantedOn":req.body.GrantedOn,
                            "ValidThru":req.body.ValidThru
                          }
                        },
                          function(err,result){
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result)


                              });

        });

router.post('/  employeelanguagedetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "Language":req.body.Language,
                            "Reading":req.body.Reading,
                            "Speaking":req.body.Speaking,
                            "Writing":req.body.Writing,
                            "Understanding":req.body.Understanding
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result);


                              });

        });

router.post('/employeedependentdetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "DependentRelationship":req.body.DependentRelationship,
                            "DateOfBirth":req.body.DateOfBirth,
                            "IdNumber":req.body.IdNumber
                          }
                        },
                          function(err,result){
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result)


                              });

        });

router.post('/employeecontactdetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);
 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "Relationship":req.body.Relationship,
                            "HomePhone":req.body.HomePhone,
                            "WorkPhone":req.body.WorkPhone,
                            "EmergencyMobilePhone":req.body.EmergencyMobilePhone
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result)


                              });

        });


router.post('/employeedocumentdetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "Document":req.body.Document,
                            "Details":req.body.Details,
                            "DateAdded":req.body.DateAdded,
                            "Status":req.body.Status
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result)


                              });

        });

router.post('/employeebankaccountdetails',function(req,res,next){
console.log(req.body);


console.log(req.body._id);

 employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {
                            "BankAccountHolderName":req.body.BankAccountHolderName,
                            "AccountNo":req.body.AccountNo,
                            "IFSCCode":req.body.IFSCCode,
                            "NameOfTheBank":req.body.NameOfTheBank,
                            "AddressOfTheBank":req.body.AddressOfTheBank
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result);


                              });

        });




router.post('/uploadEmployeeImage',function(req,res,next){
//console.log("hai");
//console.log(req.body);
//console.log(req.body._id);
//      const imagedata=req.body.images;
//const split = imagedata.split(',');
//const images=split[1];
//console.log(images);
//const buffer = Buffer.from(images, 'base64');

employeeDetailsModel.update(
                        {"_id":req.body._id},
                        {
                          $set: {

                  "images":req.body.images
                          }
                        },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result);


                              });



})



router.post('/updateEmployeeimage',function(req,res,next){
//console.log("hai");
//console.log(req.body);
//console.log(req.body._id);
//      const imagedata=req.body.images;
//const split = imagedata.split(',');
//const images=split[1];
//console.log(images);
//const buffer = Buffer.from(images, 'base64');

employeeDetailsModel.update(
                        {"Employeenumber":req.body.Employeenumber},
                        {
                        "images":req.body.images
                          },
                          function(err,result) {
                                  if (err){
                                      console.log('Error in Saving user: '+err);
                                  }
                                  res.send(result);


                              });



})




router.get('/employeeIsRegistered/:mongodid/:employeeid', function(req, res, next) {


    employeeDetailsModel.find({_id:req.params.mongodid,Employeenumber:req.params.employeeid},function(err,result){
        if (err){
            console.log('Error in Saving user: '+err);
        }
        else{
       res.send(result);
        }



    });

})



router.post('/setpassword', function(req, res, next) {

console.log(req.body);
    employeeDetailsModel.findOneAndUpdate({Employeenumber:req.body.Employeenumber},{$set:{"Password":req.body.Password}},function(err,result){
        if (err){
            console.log('Error in Saving user: '+err);
        }
        else{
       res.send(req.body.Employeenumber);
        }
    });

})


router.get('/checkuser/:employeeid/:password', function(req, res, next) {

console.log(req.params);
    employeeDetailsModel.find({"Employeenumber":req.params.employeeid,"Password":req.params.password},{"Employeenumber":1},function(err,result){
        if (err){
            console.log('Error in Saving user: '+err);
        }
        else{
        console.log(result);
       res.send(result);
        }
    });

})






router.post('/employeeRegistered/:mongodid/:employeeid', function(req, res, next) {


    employeeDetailsModel.findOneAndUpdate({_id:req.params.mongodid,Employeenumber:req.params.employeeid},{$set:{"isregistered":"true"}},{upsert:false},function(err,result){
        if (err){
            console.log('Error in Saving user: '+err);
        }
        else{
       res.send(result);
        }



    });

})


router.get('/employeeDetails/count', function (req, res){
    employeeDetailsModel.count(function(err,employeeCount){
        if(err)
            res.send(err);
        var count = {employeeCount: employeeCount};
        res.send(count);
    });
})

router.get('/employeeDetails/:start/:range', function (req, res) {
    console.log("server side")
    employeeDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))
})

router.delete('/employeeDetails/:id', function (req, res){
    employeeDetailsModel.remove({_id:req.params.id},function (err) {
        if(err)
            res.send(err)
        res.send(' employeeDetails Deleted')
    });
})

router.get('/employeeDetails', function (req, res) {
    employeeDetailsModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
//         var thumb = new Buffer(result.image.data).toString('base64');

            res.send(result)
        }

    })
})


router.post('/employeeDetails/update', function (req, res) {
    employeeDetailsModel.findOneAndUpdate(
        { "_id" : req.body.mondbId},
        req.body, // document to insert
        {upsert: true, new: true}, // options
        function (err, updatedBike) { // callback
            if (err) console.log('ERROR '+ err);
            else res.json(updatedBike)

        });

})


router.get('/employeeDetails/:employeeId', function (req, res) {
    console.log(req.params.employeeId)
    employeeDetailsModel.find({_id:req.params.employeeId},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
        console.log(result);
            res.send(result)
        }

    })
})


router.post('/employeeDetails/Name', function (req, res) {
    employeeDetailsModel.find({'Name':req.body.Name},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
})


router.get('/employeeDetailsNameAndId', function (req, res) {
    employeeDetailsModel.find({},{"_id":0,"Name":1,'Employeenumber':1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});


router.get('/getBasicDetailsOfEmployee/:employeeid', function (req, res) {
console.log(req.params.employeeid);
    employeeDetailsModel.findOne({"Employeenumber":Number(req.params.employeeid)},{"Name":1,'Employeenumber':1,'FirstName':1,'LastName':1,'Mobilephone':1,'Emailid':1,'Department':1,'Designation':1,'Supervisor':1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
        console.log(result)
            res.send(result)
        }

    })
});


router.post('/editEmployeeBasicDetails', function (req, res){
    employeeDetailsModel.findOneAndUpdate({"_id":req.body._id},req.body,function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
        console.log(result)
            res.send(result)
        }

    })
});










router.get('/getAllDetailsOfEmployee/:employeeid', function (req, res) {
    employeeDetailsModel.find({"Employeenumber":req.params.employeeid},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});


router.get('/getEmployeeArrayDetails/:employeeid', function (req, res) {
    employeeDetailsModel.find({"Employeenumber":req.params.employeeid},{Skillsdata:1,Qalificationdata:1,Certificationdata:1,Languagedata:1,Dependentdata:1,Emergencycontactdata:1,Documentdata:1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});

router.get('/getEmmployeeImage/:employeeid', function (req, res) {
    employeeDetailsModel.find({"Employeenumber":req.params.employeeid},{images:1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});





router.get('/getEmployeeBank/:employeeid', function (req, res) {
    employeeDetailsModel.find({"Employeenumber":req.params.employeeid},{BankAccountHolderName:1,AccountNo:1,IFSCCode:1,NameOfTheBank:1,NameOfTheBank:1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});



router.post('/editEmployeeBank', function (req, res){
console.log(req.body);

    employeeDetailsModel.findOneAndUpdate({"_id":req.body._id},{$set:req.body},function(err,result){
        if(err)
        {
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});


router.get('/editEmployeeBasicDetails/:employeeid', function (req, res) {
    employeeDetailsModel.find({"Employeenumber":req.params.employeeid},{BankAccountHolderName:1,AccountNo:1,IFSCCode:1,NameOfTheBank:1,NameOfTheBank:1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});




router.post('/EmployeeArrayUpdate/:mongodid/:arraydata', function (req, res) {
var y=req.body;
console.log(y);
if(req.params.arraydata=="Skillsdata")
{
employeeDetailsModel.find({"Skillsdata._id":req.params.mongodid}, {_id:0,Skillsdata: {$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Skillsdata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Skillsdata._id":req.params.mongodid}, { "$set": { "Skillsdata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}

if(req.params.arraydata=="Qalificationdata")
{
employeeDetailsModel.find({"Qalificationdata._id":req.params.mongodid}, {_id:0,Qalificationdata:{$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Qalificationdata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Qalificationdata._id":req.params.mongodid}, { "$set": { "Qalificationdata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}

if(req.params.arraydata=="Certificationdata")
{
employeeDetailsModel.find({"Certificationdata._id":req.params.mongodid}, {_id:0,Certificationdata:{$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Certificationdata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Certificationdata._id":req.params.mongodid}, { "$set": { "Certificationdata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}




if(req.params.arraydata=="Languagedata")
{
employeeDetailsModel.find({"Languagedata._id":req.params.mongodid}, {_id:0,Languagedata: {$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Languagedata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Languagedata._id":req.params.mongodid}, { "$set": { "Languagedata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}


if(req.params.arraydata=="Dependentdata")
{
employeeDetailsModel.find({"Dependentdata._id":req.params.mongodid}, {_id:0,Dependentdata: {$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Dependentdata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Dependentdata._id":req.params.mongodid}, { "$set": { "Dependentdata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}



if(req.params.arraydata=="Emergencycontactdata")
{
employeeDetailsModel.find({"Emergencycontactdata._id":req.params.mongodid}, {_id:0,Emergencycontactdata: {$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Emergencycontactdata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Emergencycontactdata._id":req.params.mongodid}, { "$set": { "Emergencycontactdata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}


if(req.params.arraydata=="Documentdata")
{
employeeDetailsModel.find({"Documentdata._id":req.params.mongodid}, {_id:0,Documentdata: {$elemMatch: {_id:req.params.mongodid }}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           if(result)
           {
         var res=result[0].Documentdata[0]
     var target = _.extend(res,y);
     console.log("juhgfds"+res);
     console.log("tar"+target);
 employeeDetailsModel.update({"Documentdata._id":req.params.mongodid}, { "$set": { "Documentdata.$":target}},function(err,resultdata){

    if(err){
            res.send(err)
            console.log(err.stack)
          }
    else  {

           console.log(resultdata);


           }

                             })
    }
                }

});
}







})











router.get('/emailSending',function(req,res){

nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({

       service: 'gmail',
        host: 'smtp.gmail.com',
       port: 587,
         secure: false,
//       secure: true,
         secureConnection: false,// true for 465, false for other ports
        auth: {
            user:'n.rukkumaninagaraj@gmail.com', // generated ethereal user
            pass:''  // generated ethereal password
        },
        tls:{
                  rejectUnauthorized:false
                  }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'n.rukkumaninagaraj@gmail.com', // sender address
        to: 'dhanalakshmi.06k@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'thi is node mailer mail', // plain text body
        html: '<b>i am coming from website?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
})






router.post('/deleteEmployeeArray/:mongodid/:arraydata', function (req, res) {
if(req.params.arraydata=="Skillsdata")
{
employeeDetailsModel.update({},{$pull:{"Skillsdata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{

        console.log(result)
                }

});
}

if(req.params.arraydata=="Qalificationdata")
{
employeeDetailsModel.update({},{$pull:{"Qalificationdata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          }
          else{
          console.log(result);
                }

});
}

if(req.params.arraydata=="Certificationdata")
{
employeeDetailsModel.update({},{$pull:{"Certificationdata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           console.log(result)
                }

});
}




if(req.params.arraydata=="Languagedata")
{
employeeDetailsModel.update({},{$pull:{"Languagedata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           console.log(result)

                }

});
}


if(req.params.arraydata=="Dependentdata")
{
employeeDetailsModel.update({},{$pull:{"Dependentdata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           console.log(result)
                }
});
}



if(req.params.arraydata=="Emergencycontactdata")
{
employeeDetailsModel.update({},{$pull:{"Emergencycontactdata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
           console.log(result)
                }

});
}


if(req.params.arraydata=="Documentdata")
{
employeeDetailsModel.update({},{$pull:{"Documentdata":{"_id":req.params.mongodid}}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
          } else{
            console.log(result)

                }

});
}

})

//{ qty: { $exists: true, $nin: [ 5, 15 ] } }


router.get('/employeeNoticeStartDate/:employeeid', function (req, res) {
console.log(req.params.employeeid);
    employeeDetailsModel.findOne({'Employeenumber':req.params.employeeid},{"releaveStartDate":1,"releaveEndDate":1},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});



router.post('/employeeServingnoticePeriod/:employeeid', function (req, res) {
console.log(req.params.employeeid);
    employeeDetailsModel.findOneAndUpdate({'Employeenumber':req.params.employeeid},{$set:{"servingnoticeperiod":true,"currentemployee":false}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});



router.post('/employeereleave/:employeeid', function (req, res) {
console.log(req.params.employeeid);
    employeeDetailsModel.findOneAndUpdate({'Employeenumber':req.params.employeeid},{$set:{"servingnoticeperiod":false,"releavedemployee":true,}},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    })
});


