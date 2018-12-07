    userapp.controller("userprojectsCtrl", function($scope,userprojectsService,fromService,$rootScope,userService) {
//    alert($rootScope.currentemployeeid)

  $scope.getEmployeeId=function()
  {
  var s=userService.getEmpID();
if(s)
   {
//   alert(s);
  }
  }
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





    $scope.userprojectsDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:"",
        editDetailsId:""
    }

    $scope.dirOptions = {};
$scope.userprojectsEditJsonConfig={}
    $scope.emptyuserprojectsFrom=function(){
        $scope.userprojectsJsonConfig={}
    }

    $scope.saveuserprojects=function(userprojectsDetailsArray){
       console.log("**************ffffgg***********************")
        console.log("userprojects det",userprojectsDetailsArray)
        var userprojectsDetailsObj={}
        saveuserprojectsDetailsToDb(userprojectsDetailsArray)
        $scope.showhide()
    }

    function  saveuserprojectsDetailsToDb(userprojectsDetails){
        $scope.unquieuserprojectsNameError=""
        for(var k=0;k<userprojectsDetails.length;k++){
            console.log(userprojectsDetails.length)
            //alert(userprojectsDetails.length)
            if(userprojectsDetails[k].realName==="Nameoftheproject"){

                var obj={}
                obj.Name=userprojectsDetails[k].modelValue
                userprojectsService.getuserprojectsDetailsByName(obj).then(function(res) {

                      console.log("hey already",res.data[0])
                    if (res.data[0]) {


                        $scope.unquieuserprojectsNameError = "company name already exists"
                        console.log($scope.unquieuserprojectsNameError)



                    }
                    else {


                        var saveObj={}
                        var userprojectsSaveObj={}
                        for(var k=0;k<userprojectsDetails.length;k++){

                            saveObj=userprojectsDetails[k]
                            userprojectsSaveObj[saveObj.realName]=saveObj.modelValue
                            if(k===userprojectsDetails.length-1){
                                userprojectsService.saveuserprojectsDetails(userprojectsSaveObj).then(function (resultDetails) {
                                  $scope.dirOptions.successinfo();

                                    console.log(resultDetails)
                                    $scope.getuserprojectsDetailsByRange(0)
                                }, function error(errResponse) {
                                    console.log(errResponse)
                                }
                         )

            }

                        }

                    }
                })
            }
        }




    }
    $scope.getuserprojectsDetailsByRange=function(pageNo){

        var pageCapacity =10;
        var start = 0;
        userprojectsService.getuserprojectsDetailsByRange(start,pageCapacity).then(function(res){
            $scope.userprojectsDetails.detailsArray=res.data;
        })
    }


    $scope.updateuserprojectsDetailsToDb=function(userprojectsDetails) {
        var editObj={}
        var userprojectsEditObj={}
        for(var k=0;k<userprojectsDetails.length;k++){
            editObj=userprojectsDetails[k]
            userprojectsEditObj[editObj.realName]=editObj.modelValue
            if(k===userprojectsDetails.length-1){
                console.log("else")
                console.log(userprojectsEditObj)
                userprojectsEditObj.mondbId=$scope.userprojectsDetails.editDetailsId
                userprojectsService.updateuserprojectsDetails(userprojectsEditObj).then(function(res){
                    $scope.userprojectsDetails.updateMessage=res.data;
                    $scope.getuserprojectsDetailsByRange(0)
                                          $scope.dirOptions.updateinfo();

                })
            }


        }




$scope.showhide2()
    }
    $scope.deleteuserprojectsDetails=function(userprojectsMongoDbId){
        userprojectsService.deleteuserprojectsDetails(userprojectsMongoDbId).then(function(res){
            $scope.userprojectsDetails.deleteMessage=res.data;
            $scope.getuserprojectsDetailsByRange(0)
                          $scope.dirOptions.dangerinfo();

          $('#btnClose').click();
       })
    }

    $scope.getuserprojectsDetailsById=function(userprojectsDetails){


        $scope.userprojectsDetails.editDetailsId=userprojectsDetails._id;


        MergeEditFrom(userprojectsDetails, userprojectsService.getuserprojectsFromConfig())
        console.log("**********************")
        console.log(userprojectsDetails)
        console.log(userprojectsService.getuserprojectsFromConfig())
        console.log("**********************")
       $scope.showhide2()

    }

    function MergeEditFrom(userprojectsDetails,userprojectsFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(userprojectsFromConfig);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=userprojectsFromConfig[k[index]].description
            obj.modelValue=userprojectsDetails[objkey]
            obj.type=userprojectsFromConfig[k[index]].type
            editObj[objkey]=obj
        });

        var userprojectsEditObj=fromService.convertJsonToArray(editObj)

        $scope.userprojectsEditJsonConfig=userprojectsEditObj;


    }
    $scope.setuserprojectsDetailsIdFroDelete=function(mongodbId){

        $scope.userprojectsDetails.mongodbIdForDelete=mongodbId;

    }
    $scope.getConfigForuserprojectsSaveFrom=function(){
        var modifiedSaveConfig=fromService.convertJsonToArray(userprojectsService.getuserprojectsFromConfig())
        $scope.userprojectsJsonConfig=modifiedSaveConfig

    }



    $scope.getProjectDetailsPerEmployee=function(employeeid)
    {
    $scope.employeeProjectDetails=[];
    userprojectsService.getUserProjectByEmployeeId(employeeid).then(function(result){
    $scope.employeeProjectDetails=result.data;

    })

    }



    $scope.lastmeetUpDetails=function(employeeid)
    {
    userprojectsService.lastmeetupByEmployeeid(employeeid).then(function(result){
         console.log(result.data);
         $scope.lastmeetup=result.data;
         $scope.lastmeetupheading=result.data[0];
    })
    }


    function init(){
    $scope.getEmployeeId();
        $scope.getuserprojectsDetailsByRange(0)
        $scope.getConfigForuserprojectsSaveFrom()
       $scope.getProjectDetailsPerEmployee(87654321);
         $scope.lastmeetUpDetails(876);
    }
    init()
});