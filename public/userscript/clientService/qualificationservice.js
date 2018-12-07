/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("qualificationService", function ($http) {
    var formConfigObj={};
    var qualificationCount;

    var getqualificationJsonConfig = function(){
        return $http.get('/qualificationJsonConfig');
    }
    var setqualificationFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getqualificationFromConfig=function(){
        return formConfigObj
    }

    var savequalificationDetails = function(qualificationData){
        return $http.post('/qualificationDetails',qualificationData);
    }
    var getqualificationDetailsByRange=function(start,range){
        return $http.get('/qualificationDetails/'+start+'/'+range);
    }
    var getqualificationDetailsCount = function(){
        return $http.get('/qualificationDetails/count');
    }
    var getqualificationCount = function(){
        return qualificationCount;
    }
    var setqualificationCount = function(val){
        qualificationCount=val;
    }
    var updatequalificationDetails = function(qualificationDetails){
        return $http.post('/qualificationDetails/update',qualificationDetails)
    }
    var deletequalificationDetails = function(id){
        return $http.delete('/qualificationDetails/'+id);
    }
    var getqualificationDetailsById = function(id){
        return $http.get('/qualificationDetails/'+id);
    }

    var getqualificationDetailsByName = function(qualificationName){
        return $http.post('/qualificationDetails/name',qualificationName);
    }

    var getAllqualificationName = function(){
        return $http.get('/qualificationDetailsName');
    }




    return{
        getqualificationJsonConfig:getqualificationJsonConfig,
        setqualificationFromConfig:setqualificationFromConfig,
        getqualificationFromConfig:getqualificationFromConfig,
        savequalificationDetails:savequalificationDetails,
        getqualificationDetailsByRange:getqualificationDetailsByRange,
        getqualificationDetailsCount:getqualificationDetailsCount,
        getqualificationCount:getqualificationCount,
        setqualificationCount:setqualificationCount,
        updatequalificationDetails:updatequalificationDetails,
        deletequalificationDetails:deletequalificationDetails,
        getqualificationDetailsById:getqualificationDetailsById,
        getqualificationDetailsByName:getqualificationDetailsByName,
        getAllqualificationName:getAllqualificationName
    }






})
