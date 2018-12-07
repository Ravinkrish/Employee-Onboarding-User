userapp.controller("userallmytimesheetsCtrl", function($scope,userallmytimesheetsService,fromService,employeeService,$window) {

$scope.exportAction = function (option) {
          switch (option) {
              case 'pdf': $scope.$broadcast('export-pdf', {});
                  break;
              case 'excel': $scope.$broadcast('export-excel', {});
                  break;
              case 'doc': $scope.$broadcast('export-doc', {});
                  break;
              case 'csv': $scope.$broadcast('export-csv', {});
                  break;
              default: console.log('no event caught');
          }
      }


    $scope.removeRow = function(name){
        var index = -1;
        var comArr = eval( $scope.companies );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );

        }
        $scope.companies.splice( index, 1 );
    };

    $scope.displayRow=function(company)
    {
        $scope.displaydata=this.company;

    };

    $scope.sortcolumn="name";
    $scope.reversesort=false;

    $scope.sortdata=function(column)
    {
        $scope.reversesort=($scope.sortcolumn==column)?!$scope.reversesort:false;
        $scope.sortcolumn=column;
    };
    $scope.getsortclass=function(column)
    {
        if($scope.sortcolumn==column)
        {
            return $scope.reversesort?'arrow-down':'arrow-up'
        }
        return '';
    };




    // formhide and show

    $scope.formvisible=false;
    $scope.tablevisible=true;
    $scope.showhide=function()
    {
        $scope.formvisible=$scope.formvisible?false:true;
        $scope.tablevisible=$scope.tablevisible?false:true;

    };
    $scope.form2visible=false;
    $scope.showhide2=function()
    {
        $scope.form2visible=$scope.form2visible?false:true;
        $scope.tablevisible=$scope.tablevisible?false:true;
    };





    $scope.userallmytimesheetsDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:"",
        editDetailsId:""
    }
$scope.dirOptions = {};
    $scope.userallmytimesheetsEditJsonConfig={}
    $scope.emptyuserallmytimesheetsFrom=function(){
        $scope.userallmytimesheetsJsonConfig={}
    }


    $scope.getuserallmytimesheetsDetailsByRange=function(pageNo){

        var pageCapacity =10;
        var start = 0;
        userallmytimesheetsService.getuserallmytimesheetsDetailsByRange(start,pageCapacity).then(function(res){
            $scope.userallmytimesheetsDetails.detailsArray=res.data;
        })
    }


    $scope.updateuserallmytimesheetsDetailsToDb=function(userallmytimesheetsDetails) {
        var editObj={}
        var userallmytimesheetsEditObj={}
        for(var k=0;k<userallmytimesheetsDetails.length;k++){
            editObj=userallmytimesheetsDetails[k]
            userallmytimesheetsEditObj[editObj.realName]=editObj.modelValue
            if(k===userallmytimesheetsDetails.length-1){
                console.log("else")
                console.log(userallmytimesheetsEditObj)
                userallmytimesheetsEditObj.mondbId=$scope.userallmytimesheetsDetails.editDetailsId
                userallmytimesheetsService.updateuserallmytimesheetsDetails(userallmytimesheetsEditObj).then(function(res){
                    $scope.userallmytimesheetsDetails.updateMessage=res.data;
                    $scope.getuserallmytimesheetsDetailsByRange(0)
                      $scope.dirOptions.updateinfo();
                })
            }


        }




$scope.showhide2()
    }
    $scope.deleteuserallmytimesheetsDetails=function(userallmytimesheetsMongoDbId){
        userallmytimesheetsService.deleteuserallmytimesheetsDetails(userallmytimesheetsMongoDbId).then(function(res){
            $scope.userallmytimesheetsDetails.deleteMessage=res.data;
            $scope.getuserallmytimesheetsDetailsByRange(0)
              $scope.dirOptions.dangerinfo();
           $('#btnClose').click();
       })
    }

    $scope.getuserallmytimesheetsDetailsById=function(userallmytimesheetsDetails){


        $scope.userallmytimesheetsDetails.editDetailsId=userallmytimesheetsDetails._id;


        MergeEditFrom(userallmytimesheetsDetails, userallmytimesheetsService.getuserallmytimesheetsFromConfig())
        console.log("**********************")
        console.log(userallmytimesheetsDetails)
        console.log(userallmytimesheetsService.getuserallmytimesheetsFromConfig())
        console.log("**********************")
       $scope.showhide2()

    }

    function MergeEditFrom(userallmytimesheetsDetails,userallmytimesheetsFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(userallmytimesheetsFromConfig);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=userallmytimesheetsFromConfig[k[index]].description
            obj.modelValue=userallmytimesheetsDetails[objkey]
            obj.type=userallmytimesheetsFromConfig[k[index]].type
            editObj[objkey]=obj
        });

        var userallmytimesheetsEditObj=fromService.convertJsonToArray(editObj)

        $scope.userallmytimesheetsEditJsonConfig=userallmytimesheetsEditObj;


    }
    $scope.setuserallmytimesheetsDetailsIdFroDelete=function(mongodbId){

        $scope.userallmytimesheetsDetails.mongodbIdForDelete=mongodbId;

    }
    $scope.getConfigForuserallmytimesheetsSaveFrom=function(){
        var modifiedSaveConfig=fromService.convertJsonToArray(userallmytimesheetsService.getuserallmytimesheetsFromConfig())
        $scope.userallmytimesheetsJsonConfig=modifiedSaveConfig
        console.log(modifiedSaveConfig);

    }


    $scope.getAlltheEmployeeNameAndId=function(){
    employeeService.getAllemployeeName().then(function(result){
    var employeeName=result.data;
    $scope.employeeId=[];
    $scope.employeeName=[];
    for(var i=0;i<employeeName.length;i++)
    {
   $scope.employeeName.push(employeeName[i].Name);
   $scope.employeeId.push(employeeName[i].Employeenumber);
    }
    console.log($scope.employeeName);
    console.log($scope.employeeId);
    })
    }



 var r = document.getElementById('result');


    $scope.startConverting=function() {

    				if('webkitSpeechRecognition' in window){
    					var speechRecognizer = new webkitSpeechRecognition();
    					speechRecognizer.continuous = true;
    					speechRecognizer.interimResults = true;
    					speechRecognizer.lang = 'en-IN';
    					speechRecognizer.start();

    					var finalTranscripts = '';

    					speechRecognizer.onresult = function(event){

    						var interimTranscripts = '';
    						for(var i = event.resultIndex; i < event.results.length; i++){
    							var transcript = event.results[i][0].transcript;
    							transcript.replace("\n", "<br>");
    							if(event.results[i].isFinal){
    								finalTranscripts += transcript;
    							}else{
    								interimTranscripts += transcript;
    							}
    						}
    						r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
    					};
    					speechRecognizer.onerror = function (event) {
    					};
    				}else{
    					r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
    				}
    			}









    $scope.dailytask=
    {
    userdailytask:'',
    date:'',
    Employee:'',
    Employeeid:''

    }



    $scope.saveUserDailyTask=function(dailytask)
    {
    console.log(dailytask)
    console.log($scope.dailytask.date);

    //var momentDate = moment($scope.dailytask.date);

    // $scope.dailytask.date=momentDate.toDate();
    $scope.dailytask.userdailytask=r.innerText;
    userallmytimesheetsService.saveDailyTask(dailytask).then(function(res){
    console.log(res.data);
    })

    }



$scope.getDisApprovedEmployeeTaskByEmployeeid=function(employeeId)
{
userallmytimesheetsService.getDisApprovedEmployeeTaskByEmployeeId(employeeId).then(function(result){
$scope.disApprovedTask=result.data;
console.log($scope.disApprovedTask);
})
}



    function init(){
       $scope.empid=$window.sessionStorage.getItem("SavedString");
        $scope.getuserallmytimesheetsDetailsByRange(0)
        $scope.getConfigForuserallmytimesheetsSaveFrom()
         $scope.getAlltheEmployeeNameAndId();
//         $scope.getApprovedEmployeeTaskByEmployeeid($scope.empid);
//         $scope.getDisApprovedEmployeeTaskByEmployeeid($scope.empid);


    }
    init()
});


userapp.controller('datepicker.controller', ['$scope', function ($scope) {

    $scope.today = moment().toDate();
    todaydate = new Date();
    console.log("todaydate", todaydate);

$scope.getdate=function(dateValue)
{
console.log(dateValue);
}






}]);

