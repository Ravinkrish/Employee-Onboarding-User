/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("projectclientService", function ($http) {
    var formConfigObj={};
    var projectclientCount;

    var getprojectclientJsonConfig = function(){
        return $http.get('/projectclientJsonConfig');
    }
    var setprojectclientFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getprojectclientFromConfig=function(){
    console.log(formConfigObj);
        return formConfigObj
    }

    var saveprojectclientDetails = function(projectclientData){
        return $http.post('/projectclientDetails',projectclientData);
    }
    var getprojectclientDetailsByRange=function(start,range){
        return $http.get('/projectclientDetails/'+start+'/'+range);
    }
    var getprojectclientDetailsCount = function(){
        return $http.get('/projectclientDetails/count');
    }
    var getprojectclientCount = function(){
        return projectclientCount;
    }
    var setprojectclientCount = function(val){
        projectclientCount=val;
    }
    var updateprojectclientDetails = function(projectclientDetails){
        return $http.post('/projectclientDetails/update',projectclientDetails)
    }
    var deleteprojectclientDetails = function(id){
        return $http.delete('/projectclientDetails/'+id);
    }
    var getprojectclientDetailsById = function(id){
        return $http.get('/projectclientDetails/'+id);
    }

    var getprojectclientDetailsByName = function(projectclientName){
        return $http.post('/projectclientDetails/name',projectclientName);
    }

    var getAllprojectclientName = function(){
        return $http.get('/projectclientDetailsName');
    }




    return{
        getprojectclientJsonConfig:getprojectclientJsonConfig,
        setprojectclientFromConfig:setprojectclientFromConfig,
        getprojectclientFromConfig:getprojectclientFromConfig,
        saveprojectclientDetails:saveprojectclientDetails,
        getprojectclientDetailsByRange:getprojectclientDetailsByRange,
        getprojectclientDetailsCount:getprojectclientDetailsCount,
        getprojectclientCount:getprojectclientCount,
        setprojectclientCount:setprojectclientCount,
        updateprojectclientDetails:updateprojectclientDetails,
        deleteprojectclientDetails:deleteprojectclientDetails,
        getprojectclientDetailsById:getprojectclientDetailsById,
        getprojectclientDetailsByName:getprojectclientDetailsByName,
        getAllprojectclientName:getAllprojectclientName
    }






})
