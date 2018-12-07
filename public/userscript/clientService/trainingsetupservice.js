/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("trainingsetupService", function ($http) {
    var formConfigObj={};
    var trainingsetupCount;

    var gettrainingsetupJsonConfig = function(){
        return $http.get('/trainingsetupJsonConfig');
    }
    var settrainingsetupFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var gettrainingsetupFromConfig=function(){
        return formConfigObj
    }

    var savetrainingsetupDetails = function(trainingsetupData){
        return $http.post('/trainingsetupDetails',trainingsetupData);
    }
    var gettrainingsetupDetailsByRange=function(start,range){
        return $http.get('/trainingsetupDetails/'+start+'/'+range);
    }
    var gettrainingsetupDetailsCount = function(){
        return $http.get('/trainingsetupDetails/count');
    }
    var gettrainingsetupCount = function(){
        return trainingsetupCount;
    }
    var settrainingsetupCount = function(val){
        trainingsetupCount=val;
    }
    var updatetrainingsetupDetails = function(trainingsetupDetails){
        return $http.post('/trainingsetupDetails/update',trainingsetupDetails)
    }
    var deletetrainingsetupDetails = function(id){
        return $http.delete('/trainingsetupDetails/'+id);
    }
    var gettrainingsetupDetailsById = function(id){
        return $http.get('/trainingsetupDetails/'+id);
    }

    var gettrainingsetupDetailsByName = function(trainingsetupName){
        return $http.post('/trainingsetupDetails/name',trainingsetupName);
    }

    var getAlltrainingsetupCourse = function(){
        return $http.get('/trainingsetupDetailsCourse');
    }




    return{
        gettrainingsetupJsonConfig:gettrainingsetupJsonConfig,
        settrainingsetupFromConfig:settrainingsetupFromConfig,
        gettrainingsetupFromConfig:gettrainingsetupFromConfig,
        savetrainingsetupDetails:savetrainingsetupDetails,
        gettrainingsetupDetailsByRange:gettrainingsetupDetailsByRange,
        gettrainingsetupDetailsCount:gettrainingsetupDetailsCount,
        gettrainingsetupCount:gettrainingsetupCount,
        settrainingsetupCount:settrainingsetupCount,
        updatetrainingsetupDetails:updatetrainingsetupDetails,
        deletetrainingsetupDetails:deletetrainingsetupDetails,
        gettrainingsetupDetailsById:gettrainingsetupDetailsById,
        gettrainingsetupDetailsByName:gettrainingsetupDetailsByName,
        getAlltrainingsetupCourse:getAlltrainingsetupCourse
    }






})
