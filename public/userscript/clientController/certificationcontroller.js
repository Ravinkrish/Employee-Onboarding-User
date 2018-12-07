userapp.controller("certificationCtrl", function ($scope, certificationService, fromService) {
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


    $scope.removeRow = function (name) {
        var index = -1;
        var comArr = eval($scope.companies);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) {


        }
        $scope.companies.splice(index, 1);
    };

    $scope.displayRow = function (company) {
        $scope.displaydata = this.company;

    };

//    $scope.sortcolumn="name";
//    $scope.reversesort=false;
//
//    $scope.sortdata=function(column)
//    {
//        $scope.reversesort=($scope.sortcolumn==column)?!$scope.reversesort:false;
//        $scope.sortcolumn=column;
//    };
//    $scope.getsortclass=function(column)
//    {
//        if($scope.sortcolumn==column)
//        {
//            return $scope.reversesort?'arrow-down':'arrow-up'
//        }
//        return '';
//    };


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


    $scope.certificationDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.certificationEditJsonConfig = {};
    $scope.emptycertificationFrom = function () {
        $scope.certificationJsonConfig = {}
    };

    $scope.savecertification = function (certificationDetailsArray) {
        console.log("**************ffffgg***********************");
        console.log("certification det", certificationDetailsArray);
        var certificationDetailsObj = {};
        savecertificationDetailsToDb(certificationDetailsArray);
        $scope.showhide()
    };

    function savecertificationDetailsToDb(certificationDetails) {
        $scope.unquiecertificationNameError = "";
        for (var k = 0; k < certificationDetails.length; k++) {
            console.log(certificationDetails.length);
            //(certificationDetails.length)
            if (certificationDetails[k].realName=="Designation") {

                var obj = {};
                obj.Name = certificationDetails[k].modelValue;
                certificationService.getcertificationDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquiecertificationNameError = "company name already exists";
                        console.log($scope.unquiecertificationNameError)


                    }
                    else {

                        var saveObj = {};
                        var certificationSaveObj = {};
                        for (var k = 0; k < certificationDetails.length; k++) {

                            saveObj = certificationDetails[k];
                            certificationSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === certificationDetails.length - 1) {
                                certificationService.savecertificationDetails(certificationSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getcertificationDetailsByRange(0)
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

    $scope.getcertificationDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        certificationService.getcertificationDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.certificationDetails.detailsArray = res.data;
        })
    };


    $scope.updatecertificationDetailsToDb = function (certificationDetails) {
        var editObj = {};
        var certificationEditObj = {};
        for (var k = 0; k < certificationDetails.length; k++) {
            editObj = certificationDetails[k];
            certificationEditObj[editObj.realName] = editObj.modelValue;
            if (k === certificationDetails.length - 1) {
                console.log("else");
                console.log(certificationEditObj);
                certificationEditObj.mondbId = $scope.certificationDetails.editDetailsId;
                certificationService.updatecertificationDetails(certificationEditObj).then(function (res) {
                    $scope.certificationDetails.updateMessage = res.data;
                    $scope.getcertificationDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletecertificationDetails = function (certificationMongoDbId) {
        certificationService.deletecertificationDetails(certificationMongoDbId).then(function (res) {
            $scope.certificationDetails.deleteMessage = res.data;
            $scope.getcertificationDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getcertificationDetailsById = function (certificationDetails) {


        $scope.certificationDetails.editDetailsId = certificationDetails._id;

        MergeEditFrom(certificationDetails, certificationService.getcertificationFromConfig());
        console.log("**********************");
        console.log(certificationDetails);
        console.log(certificationService.getcertificationFromConfig());
        console.log("**********************");
        /* certificationService.getcertificationDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(certificationDetails, certificationFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(certificationFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = certificationFromConfig[k[index]].description;
            obj.modelValue = certificationDetails[objkey];
            obj.type = certificationFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var certificationEditObj = fromService.convertJsonToArray(editObj);

        $scope.certificationEditJsonConfig = certificationEditObj;


    }

    $scope.setcertificationDetailsIdFroDelete = function (mongodbId) {
        (mongodbId);
        $scope.certificationDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForcertificationSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(certificationService.getcertificationFromConfig());
        $scope.certificationJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.getcertificationDetailsByRange(0);
        $scope.getConfigForcertificationSaveFrom()
    }

    init()
});


//angular.module('helloApp').directive('exportTable', function(){
//          var link = function ($scope, elm, attr) {
//            $scope.$on('export-pdf', function (e, d) {
////                elm.tableExport({ type: 'pdf', escape: false });
//                   elm.css('color','violet');
////             alert("hai");
//            });
//            $scope.$on('export-excel', function (e, d) {
//                elm.tableExport({ type: 'excel', escape: false });
//            });
//            $scope.$on('export-doc', function (e, d) {
//                elm.tableExport({ type: 'doc', escape: false });
//            });
//            $scope.$on('export-csv', function (e, d) {
//                elm.tableExport({ type: 'csv', escape: false });
//            });
//        }
//        return {
//            restrict: 'C',
//            link: link
//        }
//});
//
