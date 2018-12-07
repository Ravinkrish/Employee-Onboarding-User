/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("trainsessionService", function ($http) {
    var formConfigObj={};
    var trainsessionCount;

    var gettrainsessionJsonConfig = function(){
        return $http.get('/trainsessionJsonConfig');
    }
    var settrainsessionFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var gettrainsessionFromConfig=function(){
        return formConfigObj
    }

    var savetrainsessionDetails = function(trainsessionData){
        return $http.post('/trainsessionDetails',trainsessionData);
    }
    var gettrainsessionDetailsByRange=function(start,range){
        return $http.get('/trainsessionDetails/'+start+'/'+range);
    }
    var gettrainsessionDetailsCount = function(){
        return $http.get('/trainsessionDetails/count');
    }
    var gettrainsessionCount = function(){
        return trainsessionCount;
    }
    var settrainsessionCount = function(val){
        trainsessionCount=val;
    }
    var updatetrainsessionDetails = function(companyDetails){
        return $http.post('/trainsessionDetails/update',companyDetails)
    }
    var deletetrainsessionDetails = function(id){
        return $http.delete('/trainsessionDetails/'+id);
    }
    var gettrainsessionDetailsById = function(id){
        return $http.get('/trainsessionDetails/'+id);
    }

    var gettrainsessionDetailsByName = function(trainsessionName){
        return $http.post('/trainsessionDetails/name',trainsessionName);
    }

    var getAlltrainsessionName = function(){
        return $http.get('/trainsessionDetailsName');
    }




    return{
        gettrainsessionJsonConfig:gettrainsessionJsonConfig,
        settrainsessionFromConfig:settrainsessionFromConfig,
        gettrainsessionFromConfig:gettrainsessionFromConfig,
        savetrainsessionDetails:savetrainsessionDetails,
        gettrainsessionDetailsByRange:gettrainsessionDetailsByRange,
        gettrainsessionDetailsCount:gettrainsessionDetailsCount,
        gettrainsessionCount:gettrainsessionCount,
        settrainsessionCount:settrainsessionCount,
        updatetrainsessionDetails:updatetrainsessionDetails,
        deletetrainsessionDetails:deletetrainsessionDetails,
        gettrainsessionDetailsById:gettrainsessionDetailsById,
        gettrainsessionDetailsByName:gettrainsessionDetailsByName,
        getAlltrainsessionName:getAlltrainsessionName
    }






})
