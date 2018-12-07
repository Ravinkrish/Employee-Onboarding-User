userapp.controller("employeeCtrl", function($scope,employeeService,webcamservice,userService,$timeout,$state,employeefromService,$window) {

$scope.exportAction = function (option) {
        switch (option) {
            case 'pdf':
                $scope.$broadcast('export-pdf', {});
                break;
            case 'excel':
                $scope.$broadcast('export-excel', {});
                break;
            case 'doc':
                $scope.$broadcast('export-doc', {});
                break;
            case 'csv':
                $scope.$broadcast('export-csv', {});
                break;
            default:
                console.log('no event caught');
        }
    };


$scope.removeRow = function(name){
        var index = -1;
        var comArr = eval( $scope.companies );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );

        }
        $scope.companies.splice( index, 1 );
    };

    $scope.displayRow=function(company)
    {
        $scope.displaydata=this.company;

    };

    $scope.sortcolumn="name";
    $scope.reversesort=false;

    $scope.sortdata=function(column)
    {
        $scope.reversesort=($scope.sortcolumn==column)?!$scope.reversesort:false;
        $scope.sortcolumn=column;
    };
    $scope.getsortclass=function(column)
    {
        if($scope.sortcolumn==column)
        {
            return $scope.reversesort?'arrow-down':'arrow-up'
        }
        return '';
    };




    // formhide and show

       $scope.formvisible=false;
         $scope.tablevisible=true;
         $scope.showhide=function()
         {
             $scope.formvisible=$scope.formvisible?false:true;
             $scope.tablevisible=$scope.tablevisible?false:true;

         };
         $scope.form2visible=false;
         $scope.showhide2=function()
         {
             $scope.form2visible=$scope.form2visible?false:true;
             $scope.tablevisible=$scope.tablevisible?false:true;
         };

    $scope.employeeDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:"",
        editDetailsId:""
    }

 $scope.dirOptions={};


    $scope.employeeEditJsonConfig={}

//    $scope.emptyemployeeFrom=function(){
//        $scope.employeeJsonConfig={}
//    }

    $scope.saveemployee=function(employeeDetailsArray){
       console.log("**************ffffgg***********************")
        console.log("employee det",employeeDetailsArray)
        var employeeDetailsObj={}
        saveemployeeDetailsToDb(employeeDetailsArray)
//        $scope.showhide()
    }

    function  saveemployeeDetailsToDb(employeeDetails){
        $scope.unquieemployeeNameError=""
        for(var k=0;k<employeeDetails.length;k++){
//            console.log(employeeDetails.length)
            //alert(employeeDetails.length)
            if(employeeDetails[k].realName==="Employeenumber"){
                  console.log("qwertyuio");
                var obj={}
                obj.Name=employeeDetails[k].modelValue
                employeeService.getemployeeDetailsByName(obj).then(function(res) {

                      console.log("hey already",res.data[0])
                    if (res.data[0]) {


                        $scope.unquieemployeeNameError = "company name already exists"
                        console.log($scope.unquieemployeeNameError)



                    }
                    else{


                        var saveObj={}
                        var employeeSaveObj={}
                        for(var k=0;k<employeeDetails.length;k++){

                            saveObj=employeeDetails[k]
                            employeeSaveObj[saveObj.realName]=saveObj.modelValue
                            if(k===employeeDetails.length-1){
                                employeeService.saveemployeeDetails(employeeSaveObj).then(function (resultDetails) {

                                    console.log(resultDetails.data)
                                  var idForIdentification=resultDetails.data;
                                     employeeService.setidforskilluses(idForIdentification);
                                     $scope.getemployeeDetailsByRange(0);
                                     $scope.dirOptions.successinfo();
                                }, function error(errResponse) {
                                    console.log(errResponse)
                                }
                         )

            }

                        }

                    }
                });


   }




    }
    }



  $scope.getemployeeDetailsByRange=function(pageNo){
// var objectkey={};
   $scope.employeebasicarray=[];
        var pageCapacity =20;
        var start = 0;
        employeeService.getemployeeDetailsByRange(start,pageCapacity).then(function(res){
        $scope.employeeDetails.detailsArray=res.data;
        console.log($scope.employeeDetails.detailsArray);
         $scope.getemployeeNameAndForDropDown();
        })
//       console.log(res.data);
//       for (var i = 0; i<res.data.length; i++) {
//
//
//         var objectkey=Object.keys(res.data[i]);
//         console.log(objectkey);
////          console.log(objectkey);
////          for(j=0;j<objectkey.length;j++)
////          {
////          console.log(objectkey[j]);
////          console.log(res.data[i]._id);
////            console(res.data[i].objectkey[j]);
////          console.log($scope.employeeDetails.detailsArray);
////          console.log(objectkey[j]);
// var employeebasic={};
//
//
//employeebasic._id=res.data[i]._id;
// employeebasic.Name=res.data[i].Name;
//employeebasic.EmployeeNumber=res.data[i].EmployeeNumber;
//employeebasic.FirstName=res.data[i].FirstName;
//employeebasic.LastName=res.data[i].LastName;
//employeebasic.MobilePhone=res.data[i].MobilePhone;
//employeebasic.Department=res.data[i].Department;
//employeebasic.Gender=res.data[i].Gender;
//employeebasic.Supervisor=res.data[i].Supervisor;
//$scope.employeeDetails.detailsArray.push(employeebasic);
//console.log($scope.employeeDetails.detailsArray);
//
////          if(objectkey=="Supervisor")
////          {
////          break;
////         }
////       }
////       console.log(employeebasic);
//
//
//}
//
//
//
//   })
    }







 $scope.saveemployeeskillsssss=function(employeeSkillDetails){
//    console.log("i came insidde");
         console.log(employeeSkillDetails);

                    var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeeSkillDetails.length;k++){
//                                     if(employeeSkillDetails[k].realName==="Name")
//                                     {
//                                     saveObj=employeeSkillDetails[k]
//                                  employeeSaveObj[saveObj.realName]=saveObj.modelValue
//                                  console.log(employeeSaveObj);
//                                     }

                                 var idforskill=employeeService.getidforskiluses();
//                                 console.log("id");
                                 console.log(idforskill);
                                  employeeSaveObj._id=idforskill;

                                    if(employeeSkillDetails[k].realName==="Skill")
                                    {
                                    for(var j=k;j<employeeSkillDetails.length;j++)
                                    {
                                        saveObj=employeeSkillDetails[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue
//                                        if(k===employeeSkillDetails.length-1){
//

                            if(employeeSkillDetails[j].realName==='SkillDetails')
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeeskilldetails(employeeSaveObj).then(function(resultDetails){
  console.log("i am saving ");
   $scope.getemployeeDetailsByRange(0);
      $scope.dirOptions.successinfo();
       console.log(resultDetails)

            }, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}

//    $scope.getemployeeskillDetailsByRange(0);


}




//$scope.getemployeeskillDetailsByRange=function(pageNo){
//console.log("i am going inside");
//   $scope.employeebasicarray=[];
//        var pageCapacity =10;
//        var start = 0;
//        employeeService.getemployeeDetailsByRange(start,pageCapacity).then(function(res){
//
//       for (var i = 0; i<res.data.length; i++) {
//
//         var employeebasic={};
//         var objectkey=Object.keys(res.data[i]);
//
//          for(j=0;j<objectkey.length;j++)
//          {
//
//
// employeebasic.Skill=res.data[i].Skill;
//employeebasic.SkillDetails=res.data[i].SkillDetails;
//
//          if(objectkey[j]=="SkillDetails")
//          {
//          break;
//    }
//       }
//
//
//
//}
//$scope.employeeDetails.detailsArray.push(employeebasic);
//console.log($scope.employeeDetails.detailsArray);
//})
//}


$scope.saveemployeequalification=function(employeequalification)
{
                                     var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeequalification.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(employeequalification[k].realName==="Qualification")
                                    {
                                    for(var j=k;j<employeequalification.length;j++)
                                    {
                                        saveObj=employeequalification[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(employeequalification[j].realName==="CompletedOn")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeequalificationdetails(employeeSaveObj).then(function (resultDetails) {
   $scope.getemployeeDetailsByRange(0);
    $scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}

}

//certification
$scope.saveemployeecertification=function(employeecertification)
{
                                     var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeecertification.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(employeecertification[k].realName==="Certification")
                                    {
                                    for(var j=k;j<employeecertification.length;j++)
                                    {
                                        saveObj=employeecertification[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(employeecertification[j].realName==="ValidThru")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeecertificationdetails(employeeSaveObj).then(function (resultDetails) {
$scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}

}


$scope.saveemployeelanguage=function(employeelanguagedetails)
{
          var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeelanguagedetails.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(employeelanguagedetails[k].realName==="Language")
                                    {
                                    for(var j=k;j<employeelanguagedetails.length;j++)
                                    {
                                        saveObj=employeelanguagedetails[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(employeelanguagedetails[j].realName==="Understanding")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeelanguagedetails(employeeSaveObj).then(function (resultDetails) {
$scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}


}

$scope.saveemployeedependentdetails=function(employeedependentdetails)
{
          var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeedependentdetails.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(employeedependentdetails[k].realName==="DependentRelationship")
                                    {
                                    for(var j=k;j<employeedependentdetails.length;j++)
                                    {
                                        saveObj=employeedependentdetails[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(employeedependentdetails[j].realName==="IdNumber")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeeemployeedependentdetails(employeeSaveObj).then(function (resultDetails) {
$scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}


}

$scope.saveemployeeemergencydetails=function(emergencycontactdetails)
{
     var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<emergencycontactdetails.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(emergencycontactdetails[k].realName==="Relationship")
                                    {
                                    for(var j=k;j<emergencycontactdetails.length;j++)
                                    {
                                        saveObj=emergencycontactdetails[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(emergencycontactdetails[j].realName==="EmergencyMobilePhone")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeeemergencycontactdetails(employeeSaveObj).then(function (resultDetails) {
$scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}



}


//document

$scope.saveemployeedocumentdetails=function(employeedocumentdetails)
{
     var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeedocumentdetails.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(employeedocumentdetails[k].realName==="Document")
                                    {
                                    for(var j=k;j<employeedocumentdetails.length;j++)
                                    {
                                        saveObj=employeedocumentdetails[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(employeedocumentdetails[j].realName==="Status")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeeemployeedocumentdetails(employeeSaveObj).then(function (resultDetails) {
$scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}



}


$scope.saveemployeebankaccountdetails=function(employeeaccountdetails)
{
 var saveObj={}
                                    var employeeSaveObj={}
                                    for(var k=0;k<employeeaccountdetails.length;k++){

                                 var idforskill=employeeService.getidforskiluses();


                                  employeeSaveObj._id=idforskill;

                                    if(employeeaccountdetails[k].realName==="BankAccountHolderName")
                                    {
                                    for(var j=k;j<employeeaccountdetails.length;j++)
                                    {
                                        saveObj=employeeaccountdetails[j]
                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue

                            if(employeeaccountdetails[j].realName==="AddressOfTheBank")
                            {
                            break;
                            }
 }
 console.log(employeeSaveObj);
  employeeService.saveemployeebankaccountdetailsdata(employeeSaveObj).then(function (resultDetails) {
$scope.dirOptions.successinfo();
                  console.log(resultDetails)

}, function error(errResponse) {
                        console.log(errResponse)
                           }

                             )

  console.log(employeeSaveObj);

    }
}




}

$scope.updateimages=function(employeeid)
{
var imageslist=[];
imageslist=webcamservice.getimages();
console.log("image name.........................");
console.log(imageslist);
 var employeeSaveObj={}



 employeeSaveObj.Employeenumber=employeeid;

 employeeSaveObj.images=imageslist

  employeeService.updateEmployeeImagedetailsdata(employeeSaveObj).then(function (resultDetails) {

                  console.log(resultDetails)

})

}




$scope.saveimages=function()
{
var imageslist=[];
imageslist=webcamservice.getimages();
console.log("image name.........................");
console.log(imageslist);
//var saveObj={}
 var employeeSaveObj={}
//                                    for(var k=0;k<employeeaccountdetails.length;k++){
//
//                                 var idforskill=employeeService.getidforskiluses();
//
//
//                                  employeeSaveObj._id=idforskill;
//
//                                    if(employeeaccountdetails[k].realName==="images")
//                                    {
//                                    for(var j=k;j<employeeaccountdetails.length;j++)
//                                    {
//                                        saveObj=employeeaccountdetails[j]
//                                        employeeSaveObj[saveObj.realName]=saveObj.modelValue
//
//                            if(employeeaccountdetails[j].realName==="images")
//                            {
//                            break;
//                            }
// }
// console.log(employeeSaveObj);
var idforskill=employeeService.getidforskiluses();


 employeeSaveObj._id=idforskill;

 employeeSaveObj.images=imageslist

  employeeService.saveemployeeimagedetailsdata(employeeSaveObj).then(function (resultDetails) {

                  console.log(resultDetails)

})

//  console.log(employeeSaveObj);

    }

    $scope.updateemployeeDetailsToDb=function(employeeDetails) {
        var editObj={}
        var employeeEditObj={}
        for(var k=0;k<employeeDetails.length;k++){
            editObj=employeeDetails[k]
            employeeEditObj[editObj.realName]=editObj.modelValue
            if(k===employeeDetails.length-1){
                console.log("else")
                console.log(employeeEditObj)
                employeeEditObj.mondbId=$scope.employeeDetails.editDetailsId
                employeeService.updateemployeeDetails(employeeEditObj).then(function(res){
                    $scope.employeeDetails.updateMessage=res.data;
                    $scope.getemployeeDetailsByRange(0)
                })
            }


        }




$scope.showhide2()
    }
    $scope.deleteemployeeDetails=function(employeeMongoDbId){
        employeeService.deleteemployeeDetails(employeeMongoDbId).then(function(res){
            $scope.employeeDetails.deleteMessage=res.data;
            $scope.getemployeeDetailsByRange(0)
           $('#btnClose').click();
       })
    }

    $scope.getemployeeDetailsById=function(employeeDetails){
//       console.log(employeeDetails._id);

        $scope.employeeDetails.editDetailsId=employeeDetails._id;


        MergeEditFrom(employeeDetails, employeeService.getemployeeFromConfig())
        console.log("**********************")
        console.log(employeeDetails)
        console.log(employeeService.getemployeeFromConfig())
        console.log("**********************")
        $scope.showhide2()


    }

    function MergeEditFrom(employeeDetails,employeeFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(employeeFromConfig);
       console.log(k);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=employeeFromConfig[k[index]].description
            obj.modelValue=employeeDetails[objkey]
            obj.type=employeeFromConfig[k[index]].type
            editObj[objkey]=obj
        });
        if(k[10]=="images")
        {
       var imagess=employeeDetails.images.data
        console.log(imagess)
        }

        var employeeEditObj=employeefromService.convertJsonToArray(editObj)

        $scope.employeeEditJsonConfig=employeeEditObj;

}



    $scope.setemployeeDetailsIdFroDelete=function(mongodbId){

        $scope.employeeDetails.mongodbIdForDelete=mongodbId;

    }




    $scope.getConfigForemployeeSaveFrom=function(employeeid){

        var modifiedSaveConfig=employeefromService.convertJsonToArray(employeeService.getemployeeFromConfig())
        $scope.employeeJsonConfig=modifiedSaveConfig
        console.log($scope.employeeJsonConfig);
        employeeService.getEmployeeAllDetailsByEmployeeid(employeeid).then(function(result){
        console.log(result.data[0]);
        var employeeBasicDetails=result.data[0];

        for(var i=0;i<$scope.employeeJsonConfig.length;i++)
        {
//        console.log(employeeBasicDetails);
        for(empBasic in employeeBasicDetails)
        {
//        console.log(employeeBasicDetails);
//        console.log(empBasic);
       if($scope.employeeJsonConfig[i].realName==empBasic)
       {
       console.log(employeeBasicDetails[empBasic]);
       $scope.employeeJsonConfig[i].modelValue=employeeBasicDetails[empBasic];

       }

        }
        }

        })

        }



$scope.getdetailsforskill=function()
{

console.log($scope.employeeJsonConfig);
for(var i=0;i<$scope.employeeJsonConfig.length;i++)
{
console.log("hhhhhh");
//employee
if($scope.employeeJsonConfig[i].realName==="Name")
{
var j=i;
//console.log(j);
var employeeobj=[];
//var employeearrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
employeeobj.push($scope.employeeJsonConfig[x]);
$scope.employeeobject=employeeobj;




console.log(employeeobj)
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName==="Supervisor")
{
break;
}
}


}


//skill
if($scope.employeeJsonConfig[i].realName==="Skill")
{
var j=i;
//console.log(j);
var skillobj=[];
var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
skillobj.push($scope.employeeJsonConfig[x]);
$scope.skillobject=skillobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName==="SkillDetails")
{
break;
}
}


}

//qualification

if($scope.employeeJsonConfig[i].realName==="Qualification")
{
//console.log("hello auuwuw");
var j=i;
//console.log(j);
var qualificationobj=[];
//var qualificationobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
qualificationobj.push($scope.employeeJsonConfig[x]);
$scope.qualificationobject=qualificationobj;
//console.log("Qualification*")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName==="CompletedOn")
{
//console.log("hello");
break;
}
}



}


//certification
if($scope.employeeJsonConfig[i].realName==="Certification")
{
var j=i;
//console.log(j);
var Certificationobj=[];
//var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
Certificationobj.push($scope.employeeJsonConfig[x]);
$scope.Certificationobject=Certificationobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName=="ValidThru")
{
//console.log("i am came");
break;
}
}


}


//languages
if($scope.employeeJsonConfig[i].realName==="Language")
{
var j=i;
//console.log(j);
var Languageobj=[];
//var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
Languageobj.push($scope.employeeJsonConfig[x]);
$scope.Languageobject=Languageobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName=="Understanding")
{
//console.log("i am came");
break;
}
}


}

//depentent
if($scope.employeeJsonConfig[i].realName==="DependentRelationship")
{
var j=i;
//console.log(j);
var DependentRelationshipobj=[];
//var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
DependentRelationshipobj.push($scope.employeeJsonConfig[x]);
$scope.DependentRelationshipobject=DependentRelationshipobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName=="IdNumber")
{
//console.log("i am came");
break;
}
}


}


//emergency contact
if($scope.employeeJsonConfig[i].realName==="Relationship")
{
var j=i;
//console.log(j);
var Emergencyobj=[];
//var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
Emergencyobj.push($scope.employeeJsonConfig[x]);
$scope.Emergencyobject=Emergencyobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName=="EmergencyMobilePhone")
{
//console.log("i am came");
break;
}
}


}

//document
if($scope.employeeJsonConfig[i].realName==="Document")
{
var j=i;
//console.log(j);
var Documentobj=[];
//var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
Documentobj.push($scope.employeeJsonConfig[x]);
$scope.Documentobject=Documentobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName=="Status")
{
//console.log("i am came");
break;
}
}


}


//account
if($scope.employeeJsonConfig[i].realName==="BankAccountHolderName")
{
var j=i;
//console.log(j);
var BankAccountobj=[];
//var skillarrayobj={};
for(x=i;x<$scope.employeeJsonConfig.length;x++)
{
//console.log($scope.employeeJsonConfig[x]);
BankAccountobj.push($scope.employeeJsonConfig[x]);
$scope.BankAccountobject=BankAccountobj;
//console.log("skill")
//console.log(skillarrayobj);


if($scope.employeeJsonConfig[x].realName=="AddressOfTheBank")
{
//console.log("i am came");
break;
}
}


}


}
}



$scope.getemployeeNameAndForDropDown=function(){
var employeeNameId=[];
var employeeNameList=[];
var employeeIdList=[];
employeeService.getAllemployeeName().then(function(res){
        employeeNameId=res.data;
        console.log(employeeNameId.length);
        for(i=0;i<employeeNameId.length;i++)
        {

     console.log(i)
     console.log(employeeNameId[i])
       employeeNameList.push(employeeNameId[i].Name);
        employeeIdList.push(employeeNameId[i].Employeenumber);




        }

 $scope.nameofemployee=employeeNameList;
 $scope.idofemployee=employeeIdList;

  })

}


$scope.employeeIsRegistered=function(mongodid,employeeid)
{
console.log("fghjk");
employeeService.isRegisteredEmployee(mongodid,employeeid).then(function(result){
console.log(result.data);
if(result.data[0])
{
var obj=result.data[0];
console.log(obj);
var arr=Object.values(obj)
 var s=arr.includes("");
 console.log(s);
 if(s)
 {
 alert(" please registere fully");
 }
 else
 {
 employeeService.registerEmployee(mongodid,employeeid).then(function(result){
 console.log(result.data);
 alert("registered successfully");
 })
}

}
})
}


$scope.getEmployeeBasicDetailsaccordingtoEmployeeid=function(employeeid)
{
employeeService.getEmployeeBasicDetails(employeeid).then(function(result){
//console.log(result.data);
$scope.basicDetails=result.data;
console.log($scope.basicDetails);
})
}


$scope.getAllEmployeeDetailsByEmployeeid=function(employeeid)
{
employeeService.getEmployeeAllDetailsByEmployeeid(employeeid).then(function(result){
console.log(result.data);
})
}


$scope.getEmailIdByIndex=function(index)
{
console.log(index);
employeeService.sendEmail(index).then(function(res){
console.log(res.data);
})
}
// $scope.user;
//$scope.getEmployeeNumber=function()
//{
//var y=employeeService.getEmployeeid();
//userService.x(y);
// $timeout( function(){
//         $scope.user = userService.service;
//              console.log($scope.user);
//        }, 500);
//
//
//}

$scope.callEditFunction=function()
{
$state.go('userdetailsedit');
}

$scope.getEmployeeAllDetails=function(employeeid)
{
employeeService.getEmployeeAllArrayDetails(employeeid).then(function(result)
{
console.log(result.data[0]);
$scope.employeeSkillDetails=result.data[0].Skillsdata;
$scope.employeeQualificationDetails=result.data[0].Qalificationdata;
$scope.employeeCertificationDetails=result.data[0].Certificationdata;
$scope.employeeLanguageDetails=result.data[0].Languagedata;
$scope.employeeDependentDetails=result.data[0].Dependentdata;
$scope.employeeEmergencycontactDetails=result.data[0].Emergencycontactdata;
$scope.employeeDocumentdataDetails=result.data[0].Documentdata;


console.log($scope.employeeSkillDetails);
})
}
$scope.objectFromLength;
$scope.arrayType;
$scope.getEditDetailsById=function(employeedata,arrayType)
{
console.log(employeedata)
$scope.editdetails=employeedata;
$scope.arrayType=arrayType;
console.log($scope.editdetails);
console.log(Object.keys($scope.editdetails).length-1)
$scope.objectFromLength=Object.keys($scope.editdetails).length-1;
}


$scope.formsdatas = {};

$scope.updateEditData=function(key,data){
//console.log("7627645763497596273465745")
$scope.formsdatas[key]=data;
console.log($scope.formsdatas);
console.log(key)
console.log(data);
}




$scope.getEditData=function(mongoid,arraydata,editdata)
{
console.log(arraydata)
//editdata._id=mongoid;
console.log(editdata);
console.log(mongoid)
employeeService.getEditDatas(mongoid,arraydata,editdata).then(function(result){
console.log(result.data);
})
}
$scope.mongoDeleteId;
$scope.mongoArrayData;
$scope.deleteemployeeArrayDetails=function(mongodid,arrayType)
{
$scope.mongoDeleteId=mongodid;
$scope.mongoArrayData=arrayType;
}


$scope.arrayDeleteConfirm=function(mongoid,arraydata)
{
console.log(mongoid,arraydata);
employeeService.deleteEmployeeArrayDetails(mongoid,arraydata).then(function(result){
console.log(result.data);
})
}



$scope.getEmployeeBankDetails=function(employeeid)
{
employeeService.getEmployeeBankDetails(employeeid).then(function(result){
console.log(result.data)
$scope.bankobj=result.data[0];
})
}

$scope.getEmployeeImages=function(employeeid)
{
employeeService.getEmployeeImages(employeeid).then(function(result){
console.log(result.data)
$scope.imgagedata=result.data[0];
console.log($scope.imgagedata);
})
}


$scope.editEmployeeBasicDetails=function(editobject)
{
employeeService.editEmployeeBasicDetails(editobject).then(function(result){
console.log(result.data);
})
}

$scope.editEmployeeBankDetails=function(employeeid,editobj)
{
editobj._id=employeeid;
console.log(editobj);
employeeService.editEmployeeBankDetails(editobj).then(function(result){
console.log(result.data);
})
}



$scope.getEmployeeNoticePeriodStart=function(employeeid)
{
console.log("ssssssssss")
employeeService.employeeNoticePeriodStartDate(employeeid).then(function(result){
console.log(result.data);

$scope.startdate=moment(result.data.releaveStartDate).format("YYYY-MM-DD");

$scope.endDate=moment(result.data.releaveEndDate).format("YYYY-MM-DD");
$scope.currentDate=moment(new Date().toISOString()).format("YYYY-MM-DD");
console.log($scope.currentDate);
if($scope.startdate==$scope.currentDate)
{
console.log("6543211")
employeeService.setEmployeeServingPeriod(employeeid).then(function(result){
console.log(result.data);
alert("your notice period started");
})
}

if($scope.endDate==$scope.currentDate)
{
console.log("iuytrewq");
employeeService.setEmployeereleave(employeeid).then(function(result){
console.log(result.data);
})
}

})
}




    function init(){

//       $scope.getEmployeeNumber()
                $scope.empid=$window.sessionStorage.getItem("SavedString");
                console.log($scope.empid);
        $scope.getemployeeDetailsByRange(0)
        $scope.getConfigForemployeeSaveFrom($scope.empid)
        $scope.getdetailsforskill()
        $scope.getemployeeNameAndForDropDown();
        $scope.employeeIsRegistered($scope.empid);
        $scope.getEmployeeBasicDetailsaccordingtoEmployeeid($scope.empid);
        $scope.getAllEmployeeDetailsByEmployeeid($scope.empid)
        $scope.getEmployeeAllDetails($scope.empid)
        $scope.getEmployeeBankDetails($scope.empid);
        $scope.getEmployeeImages($scope.empid);
        $scope.getEmployeeNoticePeriodStart($scope.empid)
    }
    init()
});