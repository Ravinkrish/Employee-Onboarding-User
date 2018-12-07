/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("languageService", function ($http) {
    var formConfigObj={};
    var languageCount;

    var getlanguageJsonConfig = function(){
        return $http.get('/languageJsonConfig');
    }
    var setlanguageFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getlanguageFromConfig=function(){
        return formConfigObj
    }

    var savelanguageDetails = function(languageData){
        return $http.post('/languageDetails',languageData);
    }
    var getlanguageDetailsByRange=function(start,range){
        return $http.get('/languageDetails/'+start+'/'+range);
    }
    var getlanguageDetailsCount = function(){
        return $http.get('/languageDetails/count');
    }
    var getlanguageCount = function(){
        return languageCount;
    }
    var setlanguageCount = function(val){
        languageCount=val;
    }
    var updatelanguageDetails = function(companyDetails){
        return $http.post('/languageDetails/update',companyDetails)
    }
    var deletelanguageDetails = function(id){
        return $http.delete('/languageDetails/'+id);
    }
    var getlanguageDetailsById = function(id){
        return $http.get('/languageDetails/'+id);
    }

    var getlanguageDetailsByName = function(languageName){
        return $http.post('/languageDetails/name',languageName);
    }

    var getAlllanguageName = function(){
        return $http.get('/languageDetailsName');
    }




    return{
        getlanguageJsonConfig:getlanguageJsonConfig,
        setlanguageFromConfig:setlanguageFromConfig,
        getlanguageFromConfig:getlanguageFromConfig,
        savelanguageDetails:savelanguageDetails,
        getlanguageDetailsByRange:getlanguageDetailsByRange,
        getlanguageDetailsCount:getlanguageDetailsCount,
        getlanguageCount:getlanguageCount,
        setlanguageCount:setlanguageCount,
        updatelanguageDetails:updatelanguageDetails,
        deletelanguageDetails:deletelanguageDetails,
        getlanguageDetailsById:getlanguageDetailsById,
        getlanguageDetailsByName:getlanguageDetailsByName,
        getAlllanguageName:getAlllanguageName
    }






})
