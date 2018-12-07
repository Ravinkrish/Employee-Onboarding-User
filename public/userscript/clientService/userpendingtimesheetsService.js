/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("userpendingtimesheetsService", function ($http) {
    var formConfigObj={};
    var userpendingtimesheetsCount;

    var getuserpendingtimesheetsJsonConfig = function(){
        return $http.get('/userpendingtimesheetsJsonConfig');
    }
    var setuserpendingtimesheetsFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getuserpendingtimesheetsFromConfig=function(){
        return formConfigObj
    }

    var saveuserpendingtimesheetsDetails = function(userpendingtimesheetsData){
        return $http.post('/userpendingtimesheetsDetails',userpendingtimesheetsData);
    }
    var getuserpendingtimesheetsDetailsByRange=function(start,range){
        return $http.get('/userpendingtimesheetsDetails/'+start+'/'+range);
    }
    var getuserpendingtimesheetsDetailsCount = function(){
        return $http.get('/userpendingtimesheetsDetails/count');
    }
    var getuserpendingtimesheetsCount = function(){
        return userpendingtimesheetsCount;
    }
    var setuserpendingtimesheetsCount = function(val){
        userpendingtimesheetsCount=val;
    }
    var updateuserpendingtimesheetsDetails = function(companyDetails){
        return $http.post('/userpendingtimesheetsDetails/update',companyDetails)
    }
    var deleteuserpendingtimesheetsDetails = function(id){
        return $http.delete('/userpendingtimesheetsDetails/'+id);
    }
    var getuserpendingtimesheetsDetailsById = function(id){
        return $http.get('/userpendingtimesheetsDetails/'+id);
    }

    var getuserpendingtimesheetsDetailsByName = function(userpendingtimesheetsName){
        return $http.post('/userpendingtimesheetsDetails/name',userpendingtimesheetsName);
    }

    var getAlluserpendingtimesheetsName = function(){
        return $http.get('/userpendingtimesheetsDetailsName');
    }




    return{
        getuserpendingtimesheetsJsonConfig:getuserpendingtimesheetsJsonConfig,
        setuserpendingtimesheetsFromConfig:setuserpendingtimesheetsFromConfig,
        getuserpendingtimesheetsFromConfig:getuserpendingtimesheetsFromConfig,
        saveuserpendingtimesheetsDetails:saveuserpendingtimesheetsDetails,
        getuserpendingtimesheetsDetailsByRange:getuserpendingtimesheetsDetailsByRange,
        getuserpendingtimesheetsDetailsCount:getuserpendingtimesheetsDetailsCount,
        getuserpendingtimesheetsCount:getuserpendingtimesheetsCount,
        setuserpendingtimesheetsCount:setuserpendingtimesheetsCount,
        updateuserpendingtimesheetsDetails:updateuserpendingtimesheetsDetails,
        deleteuserpendingtimesheetsDetails:deleteuserpendingtimesheetsDetails,
        getuserpendingtimesheetsDetailsById:getuserpendingtimesheetsDetailsById,
        getuserpendingtimesheetsDetailsByName:getuserpendingtimesheetsDetailsByName,
        getAlluserpendingtimesheetsName:getAlluserpendingtimesheetsName
    }






})
