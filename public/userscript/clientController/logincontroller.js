userapp.controller('loginController', ['$scope','$state','employeeService','userService','$rootScope','$window', function($scope,$state,employeeService,userService,$rootScope,$window) {
$scope.passwordcheck;
$scope.repasswordcheck;
$scope.currentemployeeid;
var currentemployeeid;
$scope.$watch('logins.Password', function (newValue, oldValue, scope) {
   $scope.passwordcheck=newValue;
});

$scope.$watch('logins.RePassword',function(newValue, oldValue, scope){
$scope.repasswordcheck=newValue;
$scope.checkpassword();
})

$scope.checkpassword=function()
{
if($scope.passwordcheck==$scope.repasswordcheck)
{
console.log("ur password is correct");
}

}


$scope.setpassword=function(logins)
{
console.log(logins)
employeeService.setpasswordOfEmployee(logins).then(function(result){
console.log(result.data);

})
}


  $scope.login = function(logindata){
    console.log(logindata);
        employeeService.checkUser(logindata).then(function(result){
        console.log(result.data);
          /* $scope.currentemployeeid=result.data[0].Employeenumber;*/

           $scope.currentemployeeid=result.data[0].Employeenumber;
            console.log($scope.currentemployeeid);
            $window.sessionStorage.setItem("SavedString",$scope.currentemployeeid);
             $scope.name = $window.sessionStorage.getItem("SavedString");
             console.log($scope.name );
//            console.log( $window.sessionStrorage.employeeid);
//            $window.sessionStrorage.emp=$scope.currentemployeeid;
//            console.log($window.sessionStrorage.employeeids);
//            currentemployeeid=$scope.currentemployeeid;
              employeeService.setEmployeeid($scope.currentemployeeid);
                 $state.go('dashboard');
                                      })
                                   };


  }]);
