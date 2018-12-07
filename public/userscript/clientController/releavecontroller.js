userapp.controller("releaveCtrl", function ($scope,releaveService,$window,employeeService) {

 $scope.exportAction = function (option) {
        switch (option) {
            case 'pdf':
                $scope.$broadcast('export-pdf', {});
                break;
            case 'excel':
                $scope.$broadcast('export-excel', {});
                break;
            case 'doc':
                $scope.$broadcast('export-doc', {});
                break;
            case 'csv':
                $scope.$broadcast('export-csv', {});
                break;
            default:
                console.log('no event caught');
        }
    };




       $scope.formvisible = false;
        $scope.tablevisible = true;
        $scope.showhide = function () {
            $scope.formvisible = $scope.formvisible ? false : true;
            $scope.tablevisible = $scope.tablevisible ? false : true;

        };
        $scope.form2visible = false;
        $scope.showhide2 = function () {
            $scope.form2visible = $scope.form2visible ? false : true;
            $scope.tablevisible = $scope.tablevisible ? false : true;
        };











$scope.empid;
$scope.releaveInfo={};
$scope.releaveApply=function()
{
$scope.releaveInfo.releaveInfoDate= new Date();
console.log($scope.releaveInfo);
$scope.releaveInfo.employeeid=$scope.empid;
releaveService.sendReleaveInfo($scope.releaveInfo).then(function(result){
console.log(result.data);
})
}

$scope.getEmployeeReleaveDiscussDate=function(employeeid){

    releaveService.employeeReleaveDiscussdate(employeeid).then(function(result){
        console.log(result.data);
        $scope.discussInfo=result.data[0];
    })
}

$scope.getNoticePeriodInfo=function(employeeid)
{

releaveService.noticePeriodInfo(employeeid).then(function(result){
console.log(result.data);
$scope.noticePeriodInfo=result.data;

})
}

function init()
{
 $scope.empid=$window.sessionStorage.getItem("SavedString");
 $scope.getEmployeeReleaveDiscussDate($scope.empid);
 $scope.getNoticePeriodInfo($scope.empid)


}
init();
})
