/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("userallmytimesheetsService", function ($http) {
    var formConfigObj={};
    var userallmytimesheetsCount;

    var getuserallmytimesheetsJsonConfig = function(){
        return $http.get('/userallmytimesheetsJsonConfig');
    }
    var setuserallmytimesheetsFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getuserallmytimesheetsFromConfig=function(){
        return formConfigObj
    }

    var saveuserallmytimesheetsDetails = function(userallmytimesheetsData){
        return $http.post('/userallmytimesheetsDetails',userallmytimesheetsData);
    }
    var getuserallmytimesheetsDetailsByRange=function(start,range){
        return $http.get('/userallmytimesheetsDetails/'+start+'/'+range);
    }
    var getuserallmytimesheetsDetailsCount = function(){
        return $http.get('/userallmytimesheetsDetails/count');
    }
    var getuserallmytimesheetsCount = function(){
        return userallmytimesheetsCount;
    }
    var setuserallmytimesheetsCount = function(val){
        userallmytimesheetsCount=val;
    }
    var updateuserallmytimesheetsDetails = function(companyDetails){
        return $http.post('/userallmytimesheetsDetails/update',companyDetails)
    }
    var deleteuserallmytimesheetsDetails = function(id){
        return $http.delete('/userallmytimesheetsDetails/'+id);
    }
    var getuserallmytimesheetsDetailsById = function(id){
        return $http.get('/userallmytimesheetsDetails/'+id);
    }

    var getuserallmytimesheetsDetailsByName = function(userallmytimesheetsName){
        return $http.post('/userallmytimesheetsDetails/name',userallmytimesheetsName);
    }

    var getAlluserallmytimesheetsName = function(){
        return $http.get('/userallmytimesheetsDetailsName');
    }


    var saveDailyTask=function(dailyTask){
    console.log(dailyTask);
    return $http.post('/userdailytask',dailyTask);
    }
    var getAllTheUserDailyTask=function(){
    return $http.get('/alltheuserDailyTask');
    }
    var getUserAllTheTaskByEmployeeId=function(employeeid)
    {
    return $http.get('/allthetaskByEmployeeId/'+employeeid);
    }
    var getALLtheUserDailyTaskBYDate=function(date)
    {
    return $http.get('/userdilytaskbydate/'+date);
    }
    var updateUserDailyTaskByMongodId=function(mongodid)
    {
    return $http.post('/updateUserDailyTaskByMongodId/'+mongodid)
    }
    var updateUserDailyTaskByDateEmployeeid=function(date,employeeid)
    {
    return $http.post('/updateUserDailyTaskByDateEmployeeid/'+date+'/'+employeeid);
    }

    var deleteUserDailyTaskByMongodid=function(mongodid)
    {
    return $http.delete('/deleteUserDailyTaskByMongodid/'+mongodid);
    }


  var getApprovedEmployeeTaskByEmployeeId=function(employeeid)
  {
  return $http.get('/approveEmployeeDailyTaskByEmployeeId/'+employeeid);
  }

 var getDisApprovedEmployeeTaskByEmployeeId=function(employeeid)
  {
  return $http.get('/disapproveEmployeeDailyTaskByEmployeeId/'+employeeid);
  }


    return{
        getuserallmytimesheetsJsonConfig:getuserallmytimesheetsJsonConfig,
        setuserallmytimesheetsFromConfig:setuserallmytimesheetsFromConfig,
        getuserallmytimesheetsFromConfig:getuserallmytimesheetsFromConfig,
        saveuserallmytimesheetsDetails:saveuserallmytimesheetsDetails,
        getuserallmytimesheetsDetailsByRange:getuserallmytimesheetsDetailsByRange,
        getuserallmytimesheetsDetailsCount:getuserallmytimesheetsDetailsCount,
        getuserallmytimesheetsCount:getuserallmytimesheetsCount,
        setuserallmytimesheetsCount:setuserallmytimesheetsCount,
        updateuserallmytimesheetsDetails:updateuserallmytimesheetsDetails,
        deleteuserallmytimesheetsDetails:deleteuserallmytimesheetsDetails,
        getuserallmytimesheetsDetailsById:getuserallmytimesheetsDetailsById,
        getuserallmytimesheetsDetailsByName:getuserallmytimesheetsDetailsByName,
        getAlluserallmytimesheetsName:getAlluserallmytimesheetsName,
         saveDailyTask:saveDailyTask,
            getAllTheUserDailyTask:getAllTheUserDailyTask,
            getUserAllTheTaskByEmployeeId:getUserAllTheTaskByEmployeeId,
            getALLtheUserDailyTaskBYDate:getALLtheUserDailyTaskBYDate,
            updateUserDailyTaskByMongodId:updateUserDailyTaskByMongodId,
            updateUserDailyTaskByDateEmployeeid:updateUserDailyTaskByDateEmployeeid,
            deleteUserDailyTaskByMongodid:deleteUserDailyTaskByMongodid,
            getApprovedEmployeeTaskByEmployeeId:getApprovedEmployeeTaskByEmployeeId,
            getDisApprovedEmployeeTaskByEmployeeId:getDisApprovedEmployeeTaskByEmployeeId
    }






})
