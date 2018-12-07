userapp.factory("releaveService", function ($http) {

var sendReleaveInfo=function(releveData)
{
return $http.post('/releaveinfo',releveData);
}
var employeeReleaveDiscussdate=function(employeeid)
{
return $http.get('/discussionInfo/'+employeeid)
}

var noticePeriodInfo=function(employeeid){
return $http.get('/approvedEmployeeInfo/'+employeeid)

}



return{
sendReleaveInfo:sendReleaveInfo,
employeeReleaveDiscussdate:employeeReleaveDiscussdate,
noticePeriodInfo:noticePeriodInfo
    }






})
