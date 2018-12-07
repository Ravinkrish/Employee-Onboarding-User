
userapp.factory("certificationService", function ($http) {
    var formConfigObj={};
    var certificationCount;

    var getcertificationJsonConfig = function(){
        return $http.get('/certificationJsonConfig');
    }
    var setcertificationFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getcertificationFromConfig=function(){
        return formConfigObj
    }

    var savecertificationDetails = function(certificationData){
        return $http.post('/certificationDetails',certificationData);
    }
    var getcertificationDetailsByRange=function(start,range){
        return $http.get('/certificationDetails/'+start+'/'+range);
    }
    var getcertificationDetailsCount = function(){
        return $http.get('/certificationDetails/count');
    }
    var getcertificationCount = function(){
        return certificationCount;
    }
    var setcertificationCount = function(val){
        certificationCount=val;
    }
    var updatecertificationDetails = function(companyDetails){
        return $http.post('/certificationDetails/update',companyDetails)
    }
    var deletecertificationDetails = function(id){
        return $http.delete('/certificationDetails/'+id);
    }
    var getcertificationDetailsById = function(id){
        return $http.get('/certificationDetails/'+id);
    }

    var getcertificationDetailsByName = function(certificationName){
        return $http.post('/certificationDetails/name',certificationName);
    }

    var getAllcertificationName = function(){
        return $http.get('/certificationDetailsName');
    }




    return{
        getcertificationJsonConfig:getcertificationJsonConfig,
        setcertificationFromConfig:setcertificationFromConfig,
        getcertificationFromConfig:getcertificationFromConfig,
        savecertificationDetails:savecertificationDetails,
        getcertificationDetailsByRange:getcertificationDetailsByRange,
        getcertificationDetailsCount:getcertificationDetailsCount,
        getcertificationCount:getcertificationCount,
        setcertificationCount:setcertificationCount,
        updatecertificationDetails:updatecertificationDetails,
        deletecertificationDetails:deletecertificationDetails,
        getcertificationDetailsById:getcertificationDetailsById,
        getcertificationDetailsByName:getcertificationDetailsByName,
        getAllcertificationName:getAllcertificationName
    }






})
