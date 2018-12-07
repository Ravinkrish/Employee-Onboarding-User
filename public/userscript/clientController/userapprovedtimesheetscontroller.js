userapp.controller("userapprovedtimesheetsCtrl", function($scope,userapprovedtimesheetsService,fromService) {
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





    $scope.userapprovedtimesheetsDetails={
        detailsArray:[],
        updateMessage:"",
        deleteMessage:"",
        mongodbIdForDelete:"",
        editDetailsId:""
    }

    $scope.userapprovedtimesheetsEditJsonConfig={}
    $scope.emptyuserapprovedtimesheetsFrom=function(){
        $scope.userapprovedtimesheetsJsonConfig={}
    }

    $scope.saveuserapprovedtimesheets=function(userapprovedtimesheetsDetailsArray){
       console.log("**************ffffgg***********************")
        console.log("userapprovedtimesheets det",userapprovedtimesheetsDetailsArray)
        var userapprovedtimesheetsDetailsObj={}
        saveuserapprovedtimesheetsDetailsToDb(userapprovedtimesheetsDetailsArray)
        $scope.showhide()
    }

    function  saveuserapprovedtimesheetsDetailsToDb(userapprovedtimesheetsDetails){
        $scope.unquieuserapprovedtimesheetsNameError=""
        for(var k=0;k<userapprovedtimesheetsDetails.length;k++){
            console.log(userapprovedtimesheetsDetails.length)
            //alert(userapprovedtimesheetsDetails.length)
            if(userapprovedtimesheetsDetails[k].realName==="Start date"){

                var obj={}
                obj.Name=userapprovedtimesheetsDetails[k].modelValue
                userapprovedtimesheetsService.getuserapprovedtimesheetsDetailsByName(obj).then(function(res) {

                      console.log("hey already",res.data[0])
                    if (res.data[0]) {


                        $scope.unquieuserapprovedtimesheetsNameError = "company name already exists"
                        console.log($scope.unquieuserapprovedtimesheetsNameError)



                    }
                    else {


                        var saveObj={}
                        var userapprovedtimesheetsSaveObj={}
                        for(var k=0;k<userapprovedtimesheetsDetails.length;k++){

                            saveObj=userapprovedtimesheetsDetails[k]
                            userapprovedtimesheetsSaveObj[saveObj.realName]=saveObj.modelValue
                            if(k===userapprovedtimesheetsDetails.length-1){
                                userapprovedtimesheetsService.saveuserapprovedtimesheetsDetails(userapprovedtimesheetsSaveObj).then(function (resultDetails) {

                                    console.log(resultDetails)
                                    $scope.getuserapprovedtimesheetsDetailsByRange(0)
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
    $scope.getuserapprovedtimesheetsDetailsByRange=function(pageNo){

        var pageCapacity =10;
        var start = 0;
        userapprovedtimesheetsService.getuserapprovedtimesheetsDetailsByRange(start,pageCapacity).then(function(res){
            $scope.userapprovedtimesheetsDetails.detailsArray=res.data;
        })
    }


    $scope.updateuserapprovedtimesheetsDetailsToDb=function(userapprovedtimesheetsDetails) {
        var editObj={}
        var userapprovedtimesheetsEditObj={}
        for(var k=0;k<userapprovedtimesheetsDetails.length;k++){
            editObj=userapprovedtimesheetsDetails[k]
            userapprovedtimesheetsEditObj[editObj.realName]=editObj.modelValue
            if(k===userapprovedtimesheetsDetails.length-1){
                console.log("else")
                console.log(userapprovedtimesheetsEditObj)
                userapprovedtimesheetsEditObj.mondbId=$scope.userapprovedtimesheetsDetails.editDetailsId
                userapprovedtimesheetsService.updateuserapprovedtimesheetsDetails(userapprovedtimesheetsEditObj).then(function(res){
                    $scope.userapprovedtimesheetsDetails.updateMessage=res.data;
                    $scope.getuserapprovedtimesheetsDetailsByRange(0)
                })
            }


        }




$scope.showhide2()
    }
    $scope.deleteuserapprovedtimesheetsDetails=function(userapprovedtimesheetsMongoDbId){
        userapprovedtimesheetsService.deleteuserapprovedtimesheetsDetails(userapprovedtimesheetsMongoDbId).then(function(res){
            $scope.userapprovedtimesheetsDetails.deleteMessage=res.data;
            $scope.getuserapprovedtimesheetsDetailsByRange(0)
           $('#btnClose').click();
       })
    }

    $scope.getuserapprovedtimesheetsDetailsById=function(userapprovedtimesheetsDetails){


        $scope.userapprovedtimesheetsDetails.editDetailsId=userapprovedtimesheetsDetails._id;


        MergeEditFrom(userapprovedtimesheetsDetails, userapprovedtimesheetsService.getuserapprovedtimesheetsFromConfig())
        console.log("**********************")
        console.log(userapprovedtimesheetsDetails)
        console.log(userapprovedtimesheetsService.getuserapprovedtimesheetsFromConfig())
        console.log("**********************")
       $scope.showhide2()

    }

    function MergeEditFrom(userapprovedtimesheetsDetails,userapprovedtimesheetsFromConfig){
        var obj={}
        var editObj={}
        var k = Object.keys(userapprovedtimesheetsFromConfig);
        k.forEach(function (objkey, index) {
            var obj={}
            obj.description=userapprovedtimesheetsFromConfig[k[index]].description
            obj.modelValue=userapprovedtimesheetsDetails[objkey]
            obj.type=userapprovedtimesheetsFromConfig[k[index]].type
            editObj[objkey]=obj
        });

        var userapprovedtimesheetsEditObj=fromService.convertJsonToArray(editObj)

        $scope.userapprovedtimesheetsEditJsonConfig=userapprovedtimesheetsEditObj;


    }
    $scope.setuserapprovedtimesheetsDetailsIdFroDelete=function(mongodbId){

        $scope.userapprovedtimesheetsDetails.mongodbIdForDelete=mongodbId;

    }
    $scope.getConfigForuserapprovedtimesheetsSaveFrom=function(){
        var modifiedSaveConfig=fromService.convertJsonToArray(userapprovedtimesheetsService.getuserapprovedtimesheetsFromConfig())
        $scope.userapprovedtimesheetsJsonConfig=modifiedSaveConfig

    }

    function init(){
        $scope.getuserapprovedtimesheetsDetailsByRange(0)
        $scope.getConfigForuserapprovedtimesheetsSaveFrom()
    }
    init()
});