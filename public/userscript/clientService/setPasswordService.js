userapp.factory("userService", function ($http) {
var employeeId;
    var setEmpID=function(empId){
employeeId=empId
    }
    var getEmpID=function(){
        return employeeId
    }

    return{
    setEmpID:setEmpID,
    getEmpID:getEmpID
    }

})