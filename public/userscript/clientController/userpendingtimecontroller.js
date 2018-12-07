userapp.controller("userpendingtimesheetsCtrl", function($scope,userpendingtimesheetsService,fromService) {
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





    $scope.userpendingtimesheetsDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:"",
        editDetailsId:""
    }

    $scope.userpendingtimesheetsEditJsonConfig={}
    $scope.emptyuserpendingtimesheetsFrom=function(){
        $scope.userpendingtimesheetsJsonConfig={}
    }

    $scope.saveuserpendingtimesheets=function(userpendingtimesheetsDetailsArray){
       console.log("**************ffffgg***********************")
        console.log("userpendingtimesheets det",userpendingtimesheetsDetailsArray)
        var userpendingtimesheetsDetailsObj={}
        saveuserpendingtimesheetsDetailsToDb(userpendingtimesheetsDetailsArray)
        $scope.showhide()
    }

    function  saveuserpendingtimesheetsDetailsToDb(userpendingtimesheetsDetails){
        $scope.unquieuserpendingtimesheetsNameError=""
        for(var k=0;k<userpendingtimesheetsDetails.length;k++){
            console.log(userpendingtimesheetsDetails.length)
            //alert(userpendingtimesheetsDetails.length)
            if(userpendingtimesheetsDetails[k].realName==="Start date"){

                var obj={}
                obj.Name=userpendingtimesheetsDetails[k].modelValue
                userpendingtimesheetsService.getuserpendingtimesheetsDetailsByName(obj).then(function(res) {

                      console.log("hey already",res.data[0])
                    if (res.data[0]) {


                        $scope.unquieuserpendingtimesheetsNameError = "company name already exists"
                        console.log($scope.unquieuserpendingtimesheetsNameError)



                    }
                    else {


                        var saveObj={}
                        var userpendingtimesheetsSaveObj={}
                        for(var k=0;k<userpendingtimesheetsDetails.length;k++){

                            saveObj=userpendingtimesheetsDetails[k]
                            userpendingtimesheetsSaveObj[saveObj.realName]=saveObj.modelValue
                            if(k===userpendingtimesheetsDetails.length-1){
                                userpendingtimesheetsService.saveuserpendingtimesheetsDetails(userpendingtimesheetsSaveObj).then(function (resultDetails) {

                                    console.log(resultDetails)
                                    $scope.getuserpendingtimesheetsDetailsByRange(0)
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
    $scope.getuserpendingtimesheetsDetailsByRange=function(pageNo){

        var pageCapacity =10;
        var start = 0;
        userpendingtimesheetsService.getuserpendingtimesheetsDetailsByRange(start,pageCapacity).then(function(res){
            $scope.userpendingtimesheetsDetails.detailsArray=res.data;
        })
    }


    $scope.updateuserpendingtimesheetsDetailsToDb=function(userpendingtimesheetsDetails) {
        var editObj={}
        var userpendingtimesheetsEditObj={}
        for(var k=0;k<userpendingtimesheetsDetails.length;k++){
            editObj=userpendingtimesheetsDetails[k]
            userpendingtimesheetsEditObj[editObj.realName]=editObj.modelValue
            if(k===userpendingtimesheetsDetails.length-1){
                console.log("else")
                console.log(userpendingtimesheetsEditObj)
                userpendingtimesheetsEditObj.mondbId=$scope.userpendingtimesheetsDetails.editDetailsId
                userpendingtimesheetsService.updateuserpendingtimesheetsDetails(userpendingtimesheetsEditObj).then(function(res){
                    $scope.userpendingtimesheetsDetails.updateMessage=res.data;
                    $scope.getuserpendingtimesheetsDetailsByRange(0)
                })
            }


        }




$scope.showhide2()
    }
    $scope.deleteuserpendingtimesheetsDetails=function(userpendingtimesheetsMongoDbId){
        userpendingtimesheetsService.deleteuserpendingtimesheetsDetails(userpendingtimesheetsMongoDbId).then(function(res){
            $scope.userpendingtimesheetsDetails.deleteMessage=res.data;
            $scope.getuserpendingtimesheetsDetailsByRange(0)
           $('#btnClose').click();
       })
    }

    $scope.getuserpendingtimesheetsDetailsById=function(userpendingtimesheetsDetails){


        $scope.userpendingtimesheetsDetails.editDetailsId=userpendingtimesheetsDetails._id;


        MergeEditFrom(userpendingtimesheetsDetails, userpendingtimesheetsService.getuserpendingtimesheetsFromConfig())
        console.log("**********************")
        console.log(userpendingtimesheetsDetails)
        console.log(userpendingtimesheetsService.getuserpendingtimesheetsFromConfig())
        console.log("**********************")
       $scope.showhide2()

    }

    function MergeEditFrom(userpendingtimesheetsDetails,userpendingtimesheetsFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(userpendingtimesheetsFromConfig);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=userpendingtimesheetsFromConfig[k[index]].description
            obj.modelValue=userpendingtimesheetsDetails[objkey]
            obj.type=userpendingtimesheetsFromConfig[k[index]].type
            editObj[objkey]=obj
        });

        var userpendingtimesheetsEditObj=fromService.convertJsonToArray(editObj)

        $scope.userpendingtimesheetsEditJsonConfig=userpendingtimesheetsEditObj;


    }
    $scope.setuserpendingtimesheetsDetailsIdFroDelete=function(mongodbId){

        $scope.userpendingtimesheetsDetails.mongodbIdForDelete=mongodbId;

    }
    $scope.getConfigForuserpendingtimesheetsSaveFrom=function(){
        var modifiedSaveConfig=fromService.convertJsonToArray(userpendingtimesheetsService.getuserpendingtimesheetsFromConfig())
        $scope.userpendingtimesheetsJsonConfig=modifiedSaveConfig

    }

    function init(){
        $scope.getuserpendingtimesheetsDetailsByRange(0)
        $scope.getConfigForuserpendingtimesheetsSaveFrom()
    }
    init()
});