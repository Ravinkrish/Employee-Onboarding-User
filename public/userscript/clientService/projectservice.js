/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("projectService", function ($http) {
    var formConfigObj={};
    var projectCount;
    var mongodid;
    var setDate;

    var getprojectJsonConfig = function(){
        return $http.get('/projectJsonConfig');
    }
    var setprojectFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getprojectFromConfig=function(){
        return formConfigObj
    }

    var saveprojectDetails = function(projectData){
        return $http.post('/projectDetails',projectData);
    }
    var getprojectDetailsByRange=function(start,range){
        return $http.get('/projectDetails/'+start+'/'+range);
    }
    var getprojectDetailsCount = function(){
        return $http.get('/projectDetails/count');
    }
    var getprojectCount = function(){
        return projectCount;
    }
    var setprojectCount = function(val){
        projectCount=val;
    }
    var updateprojectDetails = function(companyDetails){
        return $http.post('/projectDetails/update',companyDetails)
    }
    var deleteprojectDetails = function(id){
        return $http.delete('/projectDetails/'+id);
    }
    var getprojectDetailsById = function(id){
        return $http.get('/projectDetails/'+id);
    }

    var getprojectDetailsByName = function(projectName){
        return $http.post('/projectDetails/name',projectName);
    }

    var getAllprojectName = function(){
        return $http.get('/projectDetailsName');
    }

var getAllprojectOfEmployee=function(){
return $http.get('/employeeIdProjectDetails');
}

var getAllTheEmployeeIdForTheProject=function()
{
return $http.get('/employeeIdClientProject');

}
var sentMongodIdForMeeting=function(mongod)
{
console.log(mongod);
mongodid=mongod;
}

var getMongodIdForMeeting=function()
{

return mongodid;
}

//var setMeetingFollowUp=function(mongodid,meeting)
//{
//console.log(meeting);
//var meetings={
//day:meeting.getDate(),
//month:meeting.getMonth(),
//year:meeting.getFullYear()
//};
//console.log(meetings);
//return $http.post('/meetingFollowup/'+mongodid,meetings);
//}

var setLastMeetUp=function(mongodids,lastmeetup){
return $http.post('/lastmeetupupdate/'+mongodids,lastmeetup);
}


var setDateAndTime=function(dateTime)
{
setDate=dateTime;
}
var getDateAndTime=function()
{
return setDate;
}

    return{
        getprojectJsonConfig:getprojectJsonConfig,
        setprojectFromConfig:setprojectFromConfig,
        getprojectFromConfig:getprojectFromConfig,
        saveprojectDetails:saveprojectDetails,
        getprojectDetailsByRange:getprojectDetailsByRange,
        getprojectDetailsCount:getprojectDetailsCount,
        getprojectCount:getprojectCount,
        setprojectCount:setprojectCount,
        updateprojectDetails:updateprojectDetails,
        deleteprojectDetails:deleteprojectDetails,
        getprojectDetailsById:getprojectDetailsById,
        getprojectDetailsByName:getprojectDetailsByName,
        getAllprojectName:getAllprojectName,
        getAllprojectOfEmployee:getAllprojectOfEmployee,
        getAllTheEmployeeIdForTheProject:getAllTheEmployeeIdForTheProject,
        sentMongodIdForMeeting:sentMongodIdForMeeting,
        getMongodIdForMeeting:getMongodIdForMeeting,
             setDateAndTime:setDateAndTime,
       getDateAndTime:getDateAndTime,
       setLastMeetUp:setLastMeetUp


    }






})
