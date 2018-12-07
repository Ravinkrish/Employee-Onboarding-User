//userapp.factory('userService', ['$rootScope', function ($rootScope) {
//var Employeeid;
//var setEmployeeid=function(currentemployeeid)
//{
//Employeeid=currentemployeeid
//}
//    var getEmployeeid ={
//
//       SaveState: function() {
//           sessionStorage.userService = angular.toJson(Employeeid);
//
//        },
//
//        RestoreState: function () {
//            service.model = angular.fromJson(sessionStorage.userService);
//        }
//    }
//
//    $rootScope.$on("savestate", getEmployeeid.SaveState);
//    $rootScope.$on("restorestate", getEmployeeid.RestoreState);
//
//    return {
//    setEmployeeid:setEmployeeid,
//    getEmployeeid:getEmployeeid
//           }
//}]);




userapp.factory('userServices', ['$rootScope','employeeService', function ($rootScope,employeeService) {
var emp;
var x=function(employeeid)
{
emp=employeeid;
}
var y=function()
{
return emp;
}
    var service = {


        SaveState: function () {
            sessionStorage.userService = angular.toJson(emp);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.userService);
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return{
     service:service,
     x:x,
     y:y
          }
}]);