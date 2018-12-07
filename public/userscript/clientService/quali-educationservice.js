/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("educationService", function ($http) {
    var formConfigObj={};
    var educationCount;

    var geteducationJsonConfig = function(){
        return $http.get('/educationJsonConfig');
    }
    var seteducationFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var geteducationFromConfig=function(){
        return formConfigObj
    }

    var saveeducationDetails = function(educationData){
        return $http.post('/educationDetails',educationData);
    }
    var geteducationDetailsByRange=function(start,range){
        return $http.get('/educationDetails/'+start+'/'+range);
    }
    var geteducationDetailsCount = function(){
        return $http.get('/educationDetails/count');
    }
    var geteducationCount = function(){
        return educationCount;
    }
    var seteducationCount = function(val){
        educationCount=val;
    }
    var updateeducationDetails = function(companyDetails){
        return $http.post('/educationDetails/update',companyDetails)
    }
    var deleteeducationDetails = function(id){
        return $http.delete('/educationDetails/'+id);
    }
    var geteducationDetailsById = function(id){
        return $http.get('/educationDetails/'+id);
    }

    var geteducationDetailsByName = function(educationName){
        return $http.post('/educationDetails/name',educationName);
    }

    var getAlleducationName = function(){
        return $http.get('/educationDetailsName');
    }




    return{
        geteducationJsonConfig:geteducationJsonConfig,
        seteducationFromConfig:seteducationFromConfig,
        geteducationFromConfig:geteducationFromConfig,
        saveeducationDetails:saveeducationDetails,
        geteducationDetailsByRange:geteducationDetailsByRange,
        geteducationDetailsCount:geteducationDetailsCount,
        geteducationCount:geteducationCount,
        seteducationCount:seteducationCount,
        updateeducationDetails:updateeducationDetails,
        deleteeducationDetails:deleteeducationDetails,
        geteducationDetailsById:geteducationDetailsById,
        geteducationDetailsByName:geteducationDetailsByName,
        getAlleducationName:getAlleducationName
    }






})
