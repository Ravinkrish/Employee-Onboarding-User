/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("employeeService", function ($http) {
    var formConfigObj={};
    var employeeCount;
    var sendingid;
    var Employeeid

    var setEmployeeid=function(employeeid)
    {
    console.log(employeeid);
    Employeeid=employeeid;
    }

    var getEmployeeid=function()
    {
    return Employeeid;
    }


    var setpasswordOfEmployee=function(login){
    console.log(login);
    return $http.post('/setpassword',login)
    }

    var checkUser=function(logindatas)
    {
//    console.log(logindatas.Employeenumber)
    Employeenumber=logindatas.Employeenumber;
    Password=logindatas.Password;
//    console.log(logindatas);
    return $http.get('/checkuser/'+Employeenumber+'/'+Password);
    }

    var getemployeeJsonConfig = function(){
    return $http.get('/employeeJsonConfig');
    }
    var setemployeeFromConfig=function(formConfig){
    console.log(formConfig);
        formConfigObj=formConfig
        }
    var getemployeeFromConfig=function(){
    console.log(formConfigObj);
        return formConfigObj
    }

    var saveemployeeDetails = function(employeeData){
        return $http.post('/employeeDetails',employeeData);
    }
    var saveemployeeskilldetails=function(employeeskill){
    console.log("i am going inside of skill");

  return $http.post('/employeeskilldetails',employeeskill);
    }

    var getemployeeDetailsByRange=function(start,range){
        return $http.get('/employeeDetails/'+start+'/'+range);
    }
    var getemployeeDetailsCount = function(){
        return $http.get('/employeeDetails/count');
    }
    var getemployeeCount = function(){
        return employeeCount;
    }
    var setemployeeCount = function(val){
        employeeCount=val;
    }
    var updateemployeeDetails = function(companyDetails){
        return $http.post('/employeeDetails/update',companyDetails)
    }
    var deleteemployeeDetails = function(id){
        return $http.delete('/employeeDetails/'+id);
    }
    var getemployeeDetailsById = function(id){
        return $http.get('/employeeDetails/'+id);
    }

    var getemployeeDetailsByName = function(employeeName){
        return $http.post('/employeeDetails/name',employeeName);
    }

    var getAllemployeeName = function(){
        return $http.get('/employeeDetailsNameAndId');
    }

var setidforskilluses=function(iddetails)
{
sendingid=iddetails;
}

var getidforskiluses=function()
{
return sendingid;
}
var saveemployeequalificationdetails=function(qualificationdata)
{
return $http.post('/employeequalificationdetails',qualificationdata)
}

var saveemployeecertificationdetails=function(certificationdata)
{
return $http.post('/employeecertificationdetails',certificationdata)
}

var saveemployeelanguagedetails=function(languagedata)
{
return $http.post('/employeelanguagedetails',languagedata)
}
var saveemployeeemployeedependentdetails=function(dependentdata)
{
return $http.post('/employeedependentdetails',dependentdata)
}
var saveemployeeemergencycontactdetails=function(emergencydata)
{
return $http.post('/employeecontactdetails',emergencydata)
}
var saveemployeeemployeedocumentdetails=function(documentdata)
{
return $http.post('/employeedocumentdetails',documentdata)
}
var saveemployeebankaccountdetailsdata=function(bankaccountdata)
{
return $http.post('/employeebankaccountdetails',bankaccountdata)
}
var saveemployeeimagedetailsdata=function(imagedata)
{
console.log(imagedata);
return $http.post('/uploadEmployeeImage',imagedata);

}
var sendEmail=function(emailid)
{
console.log(emailid);
return $http.get('/emailSending',emailid);
}

var isRegisteredEmployee=function(mongodid,employeeid)
{
return $http.get('/employeeIsRegistered/'+mongodid+'/'+employeeid);
}

var registerEmployee=function(mongodid,employeeid)
{
return $http.post('/employeeRegistered/'+mongodid+'/'+employeeid);
}


var getEmployeeBasicDetails=function(employeeid){
return  $http.get('/getBasicDetailsOfEmployee/'+employeeid)
}

var editEmployeeBasicDetails=function(editobj)
{
return $http.post('/editEmployeeBasicDetails',editobj);
}

var getEmployeeAllDetailsByEmployeeid=function(employeeid){
return  $http.get('/getAllDetailsOfEmployee/'+employeeid);
}

var getEmployeeAllArrayDetails=function(employeeid){
return  $http.get('/getEmployeeArrayDetails/'+employeeid);
}

var updateEmployeeImagedetailsdata=function(employeeobj)
{
return  $http.post('/updateEmployeeimage',employeeobj);

}

var getEditDatas=function(mongoid,arraydata,editData)
{
console.log(mongoid,arraydata,editData);
return $http.post('/EmployeeArrayUpdate/'+mongoid+'/'+arraydata,editData)

}

 var deleteEmployeeArrayDetails = function(mongoid,arraydata){
        return $http.post('/deleteEmployeeArray/'+mongoid+'/'+arraydata);
    }

var getEmployeeBankDetails=function(employeeId)
{
return  $http.get('/getEmployeeBank/'+employeeId);
}

var editEmployeeBankDetails=function(editobj)
{
return  $http.post('/editEmployeeBank',editobj);
}

var getEmployeeImages=function(employeeid)
{
return  $http.get('/getEmmployeeImage/'+employeeid);

}
var employeeNoticePeriodStartDate=function(employeeno)
{
console.log(employeeno);
return $http.get('/employeeNoticeStartDate/'+employeeno);
}

var setEmployeeServingPeriod=function(employeeno)
{
return $http.post('/employeeServingnoticePeriod/'+employeeno)
}
var setEmployeereleave=function(employeeno)
{
return $http.post('/employeereleave/'+employeeno)

}





    return{
        getemployeeJsonConfig:getemployeeJsonConfig,
        setemployeeFromConfig:setemployeeFromConfig,
        getemployeeFromConfig:getemployeeFromConfig,
        saveemployeeDetails:saveemployeeDetails,
        getemployeeDetailsByRange:getemployeeDetailsByRange,
        getemployeeDetailsCount:getemployeeDetailsCount,
        getemployeeCount:getemployeeCount,
        setemployeeCount:setemployeeCount,
        updateemployeeDetails:updateemployeeDetails,
        deleteemployeeDetails:deleteemployeeDetails,
        getemployeeDetailsById:getemployeeDetailsById,
        getemployeeDetailsByName:getemployeeDetailsByName,
        getAllemployeeName:getAllemployeeName,
        saveemployeeskilldetails:saveemployeeskilldetails,
        setidforskilluses:setidforskilluses,
        getidforskiluses:getidforskiluses,
        saveemployeequalificationdetails:saveemployeequalificationdetails,
        saveemployeecertificationdetails:saveemployeecertificationdetails,
        saveemployeelanguagedetails:saveemployeelanguagedetails,
        saveemployeeemployeedependentdetails:saveemployeeemployeedependentdetails,
        saveemployeeemergencycontactdetails:saveemployeeemergencycontactdetails,
         saveemployeeemployeedocumentdetails:saveemployeeemployeedocumentdetails,
         saveemployeebankaccountdetailsdata:saveemployeebankaccountdetailsdata,
         saveemployeeimagedetailsdata:saveemployeeimagedetailsdata,
         sendEmail:sendEmail,
         isRegisteredEmployee:isRegisteredEmployee,
         registerEmployee:registerEmployee,
         getEmployeeBasicDetails:getEmployeeBasicDetails,
         getEmployeeAllDetailsByEmployeeid:getEmployeeAllDetailsByEmployeeid,
         setpasswordOfEmployee:setpasswordOfEmployee,
         checkUser:checkUser,
         setEmployeeid:setEmployeeid,
         getEmployeeid:getEmployeeid,
         getEmployeeAllArrayDetails:getEmployeeAllArrayDetails,
         getEditDatas:getEditDatas,
         getEmployeeBankDetails:getEmployeeBankDetails,
         getEmployeeImages:getEmployeeImages,
         editEmployeeBasicDetails:editEmployeeBasicDetails,
         editEmployeeBankDetails:editEmployeeBankDetails,
         deleteEmployeeArrayDetails:deleteEmployeeArrayDetails,
         updateEmployeeImagedetailsdata:updateEmployeeImagedetailsdata,
         employeeNoticePeriodStartDate:employeeNoticePeriodStartDate,
         setEmployeeServingPeriod:setEmployeeServingPeriod,
         setEmployeereleave:setEmployeereleave
    }
})
