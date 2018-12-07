/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("employeementService", function ($http) {
    var formConfigObj={};
    var employeementCount;

    var getemployeementJsonConfig = function(){
        return $http.get('/employeementJsonConfig');
    }
    var setemployeementFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getemployeementFromConfig=function(){
        return formConfigObj
    }

    var saveemployeementDetails = function(employeementData){
        return $http.post('/employeementDetails',employeementData);
    }
    var getemployeementDetailsByRange=function(start,range){
        return $http.get('/employeementDetails/'+start+'/'+range);
    }
    var getemployeementDetailsCount = function(){
        return $http.get('/employeementDetails/count');
    }
    var getemployeementCount = function(){
        return employeementCount;
    }
    var setemployeementCount = function(val){
        employeementCount=val;
    }
    var updateemployeementDetails = function(companyDetails){
        return $http.post('/employeementDetails/update',companyDetails)
    }
    var deleteemployeementDetails = function(id){
        return $http.delete('/employeementDetails/'+id);
    }
    var getemployeementDetailsById = function(id){
        return $http.get('/employeementDetails/'+id);
    }

    var getemployeementDetailsByName = function(employeementName){
        return $http.post('/employeementDetails/name',employeementName);
    }

    var getAllemployeementName = function(){
        return $http.get('/employeementDetailsName');
    }




    return{
        getemployeementJsonConfig:getemployeementJsonConfig,
        setemployeementFromConfig:setemployeementFromConfig,
        getemployeementFromConfig:getemployeementFromConfig,
        saveemployeementDetails:saveemployeementDetails,
        getemployeementDetailsByRange:getemployeementDetailsByRange,
        getemployeementDetailsCount:getemployeementDetailsCount,
        getemployeementCount:getemployeementCount,
        setemployeementCount:setemployeementCount,
        updateemployeementDetails:updateemployeementDetails,
        deleteemployeementDetails:deleteemployeementDetails,
        getemployeementDetailsById:getemployeementDetailsById,
        getemployeementDetailsByName:getemployeementDetailsByName,
        getAllemployeementName:getAllemployeementName
    }






})
