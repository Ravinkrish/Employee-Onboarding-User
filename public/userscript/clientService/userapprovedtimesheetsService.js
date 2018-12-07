/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("userapprovedtimesheetsService", function ($http) {
    var formConfigObj={};
    var userapprovedtimesheetsCount;

    var getuserapprovedtimesheetsJsonConfig = function(){
        return $http.get('/userapprovedtimesheetsJsonConfig');
    }
    var setuserapprovedtimesheetsFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getuserapprovedtimesheetsFromConfig=function(){
        return formConfigObj
    }

    var saveuserapprovedtimesheetsDetails = function(userapprovedtimesheetsData){
        return $http.post('/userapprovedtimesheetsDetails',userapprovedtimesheetsData);
    }
    var getuserapprovedtimesheetsDetailsByRange=function(start,range){
        return $http.get('/userapprovedtimesheetsDetails/'+start+'/'+range);
    }
    var getuserapprovedtimesheetsDetailsCount = function(){
        return $http.get('/userapprovedtimesheetsDetails/count');
    }
    var getuserapprovedtimesheetsCount = function(){
        return userapprovedtimesheetsCount;
    }
    var setuserapprovedtimesheetsCount = function(val){
        userapprovedtimesheetsCount=val;
    }
    var updateuserapprovedtimesheetsDetails = function(companyDetails){
        return $http.post('/userapprovedtimesheetsDetails/update',companyDetails)
    }
    var deleteuserapprovedtimesheetsDetails = function(id){
        return $http.delete('/userapprovedtimesheetsDetails/'+id);
    }
    var getuserapprovedtimesheetsDetailsById = function(id){
        return $http.get('/userapprovedtimesheetsDetails/'+id);
    }

    var getuserapprovedtimesheetsDetailsByName = function(userapprovedtimesheetsName){
        return $http.post('/userapprovedtimesheetsDetails/name',userapprovedtimesheetsName);
    }

    var getAlluserapprovedtimesheetsName = function(){
        return $http.get('/userapprovedtimesheetsDetailsName');
    }




    return{
        getuserapprovedtimesheetsJsonConfig:getuserapprovedtimesheetsJsonConfig,
        setuserapprovedtimesheetsFromConfig:setuserapprovedtimesheetsFromConfig,
        getuserapprovedtimesheetsFromConfig:getuserapprovedtimesheetsFromConfig,
        saveuserapprovedtimesheetsDetails:saveuserapprovedtimesheetsDetails,
        getuserapprovedtimesheetsDetailsByRange:getuserapprovedtimesheetsDetailsByRange,
        getuserapprovedtimesheetsDetailsCount:getuserapprovedtimesheetsDetailsCount,
        getuserapprovedtimesheetsCount:getuserapprovedtimesheetsCount,
        setuserapprovedtimesheetsCount:setuserapprovedtimesheetsCount,
        updateuserapprovedtimesheetsDetails:updateuserapprovedtimesheetsDetails,
        deleteuserapprovedtimesheetsDetails:deleteuserapprovedtimesheetsDetails,
        getuserapprovedtimesheetsDetailsById:getuserapprovedtimesheetsDetailsById,
        getuserapprovedtimesheetsDetailsByName:getuserapprovedtimesheetsDetailsByName,
        getAlluserapprovedtimesheetsName:getAlluserapprovedtimesheetsName
    }






})
