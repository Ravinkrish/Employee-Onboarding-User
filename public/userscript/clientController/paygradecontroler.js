userapp.controller("payGradeCtrl", function ($scope, payGradeService, fromService,jobdetailsservice) {


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



    // formhide and show

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


    $scope.payGradeDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.payGradeEditJsonConfig = {};
    $scope.emptyclientFrom = function () {
        $scope.payGradeJsonConfig = {}
    };

    $scope.savepayGrade = function (payGradeDetailsArray) {


        console.log("**************ffffgg***********************");
        console.log("client det", payGradeDetailsArray);
        var payGradeDetailsObj = {};
        savepayGradeDetailsToDb(payGradeDetailsArray);
        $scope.showhide()
    };

    function savepayGradeDetailsToDb(payGradeDetails) {
    console.log(payGradeDetails);
        $scope.unquieClientNameError = "";
        for (var k = 0; k < payGradeDetails.length; k++) {
            console.log(payGradeDetails.length);
            //alert(clientDetails.length)
            if (payGradeDetails[k].realName=="Designation") {

                var obj = {};
                obj.Name = payGradeDetails[k].modelValue;

                payGradeService.getpayGradeDetailsByName(obj).then(function (res) {

//                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieClientNameError = "company name already exists";
                        console.log($scope.unquieClientNameError)


                    }
                    else {


                        var saveObj = {};
                        var payGradeSaveObj = {};

                        for (var k = 0; k < payGradeDetails.length; k++) {

                            saveObj = payGradeDetails[k];
                            payGradeSaveObj[saveObj.realName] = saveObj.modelValue;
                            console.log("paygrade");
                            console.log(payGradeSaveObj);
                            if (k === payGradeDetails.length - 1) {
                                payGradeService.savepayGradeDetails(payGradeSaveObj).then(function (resultDetails) {

                                        $scope.getpayGradeDetailsByRange(0)
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

    $scope.getpayGradeDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        payGradeService.getpayGradeDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.payGradeDetails.detailsArray = res.data;
//            console.log($scope.payGradeDetails.detailsArray);
        })
    };


    $scope.updatepayGradeDetailsToDb = function (payGradeDetails) {
        var editObj = {};
        var payGradeEditObj = {};
        for (var k = 0; k < payGradeDetails.length; k++) {
            editObj = payGradeDetails[k];
            payGradeEditObj[editObj.realName] = editObj.modelValue;
            if (k === payGradeDetails.length - 1) {
                console.log("else");
                console.log(payGradeEditObj);
                payGradeEditObj.mondbId = $scope.payGradeDetails.editDetailsId;
                payGradeService.updatepayGradeDetails(payGradeEditObj).then(function (res) {
                    $scope.payGradeDetails.updateMessage = res.data;
                    $scope.getpayGradeDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletepayGradeDetails = function (payGradeMongoDbId) {
        payGradeService.deletepayGradeDetails(payGradeMongoDbId).then(function (res) {
            $scope.payGradeDetails.deleteMessage = res.data;
            $scope.getpayGradeDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getpayGradeDetailsById = function (payGradeDetails) {


        $scope.payGradeDetails.editDetailsId = payGradeDetails._id;

        MergeEditFrom(payGradeDetails, payGradeService.getpayGradeFromConfig());
        console.log("**********************");
        console.log(payGradeDetails);
        console.log(payGradeService.getpayGradeFromConfig());
        console.log("**********************");
        /* clientService.getClientDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(payGradeDetails, payGradeFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(payGradeFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = payGradeFromConfig[k[index]].description;
            obj.modelValue = payGradeDetails[objkey];
            obj.type = payGradeFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var payGradeEditObj = fromService.convertJsonToArray(editObj);

        $scope.payGradeEditJsonConfig = payGradeEditObj;


    }

    $scope.setpayGradeDetailsIdFroDelete = function (mongodbId) {

        $scope.payGradeDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForpayGradeSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(payGradeService.getpayGradeFromConfig());
        console.log(modifiedSaveConfig);
        $scope.payGradeJsonConfig = modifiedSaveConfig

    };

    $scope.getjobdetaisforpaygrade=function(){
  jobdetailsservice.getAlljobdetailsName().then(function (res) {
$scope.paygradearray=[];
   $scope.payGradeDetailsforjobtitile=res.data;
 console.log($scope.payGradeDetailsforjobtitile);
//   console.log($scope.paygradearray);

});
  }




$scope.currencyDetails=function()
   {

$scope.listofcurrency = [];

   $scope.listofcurrencys=[{name:"INR"},{name:"EUR"},{name:"DOLLAR"},{name:"INR"}];;
        for(var i=0; i<$scope.listofcurrencys.length; i++) {
              $scope.listofcurrency.push($scope.listofcurrencys[i].name);
             console.log($scope.listofcurrency);
           }
      }




    function init() {
        $scope.currencyDetails();
      $scope.getjobdetaisforpaygrade();
        $scope.getpayGradeDetailsByRange(0);
        $scope.getConfigForpayGradeSaveFrom();

    }

    init()
});


//angular.module('userapp').directive('exportTable', function () {
//    var link = function ($scope, element, attr) {
//        $scope.$on('export-pdf', function (e, d) {
//            element.exportDetails();
//        })
//
//      $scope.$on('export-excel', function (e, d) {
//                element.exportDetails({ type: 'excel', escape: false });
//            });
//            $scope.$on('export-doc', function (e, d) {
//                element. exportDetails({ type: 'doc', escape: false});
//            });
//            $scope.$on('export-csv', function (e, d) {
//                element. exportDetails({ type: 'csv', escape:false });
//            });
//    }
//    return {
//        restrict: 'A',
//        link: link
//    };
//});