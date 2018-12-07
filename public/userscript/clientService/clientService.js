/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("clientService", function ($http) {
    var formConfigObj={};
    var leveldatas={};
    var getlavelhead=[];
    var ceofulllist=[];
    var employeefulllist=[];
    var managerfulllist=[];
    var clientCount;

    var getClientJsonConfig = function(){
        return $http.get('/ClientJsonConfig');
    }
    var setClientFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getClientFromConfig=function(){
        return formConfigObj
    }

    var saveClientDetails = function(clientData){
        return $http.post('/ClientDetails',clientData);
    }
    var getClientDetailsByRange=function(start,range){
        return $http.get('/ClientDetails/'+start+'/'+range);
    }
    var getClientDetailsCount = function(){
        return $http.get('/ClientDetails/count');
    }
    var getClientCount = function(){
        return clientCount;
    }
    var setClientCount = function(val){
        clientCount=val;
    }
    var updateClientDetails = function(companyDetails){
        return $http.post('/ClientDetails/update',companyDetails)
    }
    var deleteClientDetails = function(id){
        return $http.delete('/ClientDetails/'+id);
    }
    var getClientDetailsById = function(id){
        return $http.get('/ClientDetails/'+id);
    }

    var getClientDetailsByName = function(clientName){
        return $http.post('/ClientDetails/name',clientName);
    }

    var getAllClientName = function(){
        return $http.get('/ClientDetailsName');
    }


var sendingleveltosave=function(levelfromdrop)
{
leveldatas=levelfromdrop;
console.log(leveldatas);
}

var gettinglevelfromsaved=function()
{
console.log("lever");
console.log(leveldatas);
return leveldatas;
}

var getdataforbothheadlevel=function()
{
return getlavelhead;
}
var getAllClientLevelHead=function(){
    return $http.get('/Clientlevelhead');
    }

//datafortreegraph
var stroingceodetails=function(ceo)
{
ceofulllist=ceo;
console.log(ceofulllist);
}
var storingmanagerdetails=function(manager)
{ managerfulllist=manager;
console.log(managerfulllist);
}
var storingemployeedetails=function(employee)
{
 employeefulllist=employee;
console.log(employeefulllist);
}

var gettingceodetails=function()
{
console.log(ceofulllist);
return ceofulllist;
}
var gettingmanagerdetails=function()
{
console.log(managerfulllist);
return managerfulllist;
}
var gettingemployeedetails=function()
{
console.log(employeefulllist);
return employeefulllist;
}


    return{
        getClientJsonConfig:getClientJsonConfig,
        setClientFromConfig:setClientFromConfig,
        getClientFromConfig:getClientFromConfig,
        saveClientDetails:saveClientDetails,
        getClientDetailsByRange:getClientDetailsByRange,
        getClientDetailsCount:getClientDetailsCount,
        getClientCount:getClientCount,
        setClientCount:setClientCount,
        updateClientDetails:updateClientDetails,
        deleteClientDetails:deleteClientDetails,
        getClientDetailsById:getClientDetailsById,
        getClientDetailsByName:getClientDetailsByName,
        getAllClientName:getAllClientName,
         sendingleveltosave:sendingleveltosave,
          gettinglevelfromsaved:gettinglevelfromsaved,

           getdataforbothheadlevel:getdataforbothheadlevel,
           getAllClientLevelHead:getAllClientLevelHead,

          stroingceodetails:stroingceodetails,
          storingmanagerdetails:storingmanagerdetails,
          storingemployeedetails:storingemployeedetails,
             gettingceodetails:gettingceodetails,
                       gettingmanagerdetails:gettingmanagerdetails,
                    gettingemployeedetails:gettingemployeedetails

    }






})
