/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("jobdetailsservice", function ($http) {
    var formConfigObj={};
    var jobdetailsCount;

    var getjobdetailsJsonConfig = function(){
        return $http.get('/jobdetailsJsonConfig');
    }
    var setjobdetailsFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getjobdetailsFromConfig=function(){
        return formConfigObj
    }

    var savejobdetailsDetails = function(jobdetailsData){
        return $http.post('/jobdetailsDetails',jobdetailsData);
    }
    var getjobdetailsDetailsByRange=function(start,range){
        return $http.get('/jobdetailsDetails/'+start+'/'+range);
    }
    var getjobdetailsDetailsCount = function(){
        return $http.get('/jobdetailsDetails/count');
    }
    var getjobdetailsCount = function(){
        return jobdetailsCount;
    }
    var setjobdetailsCount = function(val){
        jobdetailsCount=val;
    }
    var updatejobdetailsDetails = function(jobdetailsDetails){
        return $http.post('/jobdetailsDetails/update',jobdetailsDetails)
    }
    var deletejobdetailsDetails = function(id){
        return $http.delete('/jobdetailsDetails/'+id);
    }
    var getjobdetailsDetailsById = function(id){
        return $http.get('/jobdetailsDetails/'+id);
    }

    var getjobdetailsDetailsByName = function(jobdetailsName){
        return $http.post('/jobdetailsDetails/name',jobdetailsName);

    }

    var getAlljobdetailsName = function(){
        return $http.get('/jobdetailsDetailsName');
    }




    return{
        getjobdetailsJsonConfig:getjobdetailsJsonConfig,
        setjobdetailsFromConfig:setjobdetailsFromConfig,
        getjobdetailsFromConfig:getjobdetailsFromConfig,
        savejobdetailsDetails:savejobdetailsDetails,
        getjobdetailsDetailsByRange:getjobdetailsDetailsByRange,
        getjobdetailsDetailsCount:getjobdetailsDetailsCount,
        getjobdetailsCount:getjobdetailsCount,
        setjobdetailsCount:setjobdetailsCount,
        updatejobdetailsDetails:updatejobdetailsDetails,
        deletejobdetailsDetails:deletejobdetailsDetails,
        getjobdetailsDetailsById:getjobdetailsDetailsById,
        getjobdetailsDetailsByName:getjobdetailsDetailsByName,
        getAlljobdetailsName:getAlljobdetailsName
    }






})
