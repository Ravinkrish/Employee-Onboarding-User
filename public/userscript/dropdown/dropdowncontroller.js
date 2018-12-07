
singapp.controller('myCtrl', function($scope,clientService) {

    $scope.heads = [{name: 'CEO'},{ name: 'MANAGER'},{ name: 'CTO'},{ name: 'Employee'},{ name: 'Project Lead'},{ name: 'Team Lead'},{ name: 'Maintenance Manager'},{ name: 'Sales Manager'}];

var levelfromdrop={};
$scope.sendinglevel=function(lev)
{
var levelfromdrop=lev;
console.log(levelfromdrop);
clientService.sendingleveltosave(levelfromdrop);


}
$scope.sendinghead=function(hea)
{
var headfromdrop=[]
headfromdrop.push(hea);
console.log(headfromdrop);
var leveldata=[];
var levelfrom=clientService.gettinglevelfromsaved();
leveldata.push(levelfrom);
console.log(leveldata);
//var leveldata= $scope.sendinglevel();
var headlevel=[];
var headlevel=[...headfromdrop,...leveldata];
console.log(headlevel);
//clientService.setdataforbothheadlevel(headlevel);
}

$scope.gettingdatafromdatabase=function()
{
var detaillevelhead=clientService.getAllClientLevelHead();
//console.log(detaillevelhead);
}
   function init() {
$scope.gettingdatafromdatabase();
}
init()

});

