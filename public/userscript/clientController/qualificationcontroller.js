userapp.controller("qualificationCtrl", function ($scope, qualificationService, fromService) {


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


    $scope.qualificationDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.qualificationEditJsonConfig = {};
    $scope.emptyqualificationFrom = function () {
        $scope.qualificationJsonConfig = {}
    };

    $scope.savequalification = function (qualificationDetailsArray) {

        console.log("**************ffffgg***********************");
        console.log("qualification det", qualificationDetailsArray);
        var qualificationDetailsObj = {};
        savequalificationDetailsToDb(qualificationDetailsArray);
        $scope.showhide()
    };

    function savequalificationDetailsToDb(qualificationDetails) {
        $scope.unquieClientNameError = "";
        for (var k = 0; k < qualificationDetails.length; k++) {
            console.log(qualificationDetails.length);
            //alert(clientDetails.length)
            if (qualificationDetails[k].realName === "Designation") {

                var obj = {};
                obj.Name = qualificationDetails[k].modelValue;
                qualificationService.getqualificationDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquiequalificationNameError = "company name already exists";
                        console.log($scope.unquieClientNameError)


                    }
                    else {


                        var saveObj = {};
                        var qualificationSaveObj = {};
                        for (var k = 0; k < qualificationDetails.length; k++) {

                            saveObj = qualificationDetails[k];
                            qualificationSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === qualificationDetails.length - 1) {

                                qualificationService.savequalificationDetails(qualificationSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getqualificationDetailsByRange(0)
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

    $scope.getqualificationDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        qualificationService.getqualificationDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.qualificationDetails.detailsArray = res.data;
        })
    };


    $scope.updatequalificationDetailsToDb = function (qualificationDetails) {
        var editObj = {};
        var qualificationEditObj = {};
        for (var k = 0; k < qualificationDetails.length; k++) {
            editObj = qualificationDetails[k];
            qualificationEditObj[editObj.realName] = editObj.modelValue;
            if (k === qualificationDetails.length - 1) {
                console.log("else");
                console.log(qualificationEditObj);
                qualificationEditObj.mondbId = $scope.qualificationDetails.editDetailsId;
                qualificationService.updatequalificationDetails(qualificationEditObj).then(function (res) {
                    $scope.qualificationDetails.updateMessage = res.data;
                    $scope.getqualificationDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletequalificationDetails = function (qualificationMongoDbId) {
        qualificationService.deletequalificationDetails(qualificationMongoDbId).then(function (res) {
            $scope.qualificationDetails.deleteMessage = res.data;
            $scope.getqualificationDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getqualificationDetailsById = function (qualificationDetails) {


        $scope.qualificationDetails.editDetailsId = qualificationDetails._id;

        MergeEditFrom(qualificationDetails, qualificationService.getqualificationFromConfig());
        console.log("**********************");
        console.log(qualificationDetails);
        console.log(qualificationService.getqualificationFromConfig());
        console.log("**********************");
        /* clientService.getClientDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(qualificationDetails, qualificationFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(qualificationFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = qualificationFromConfig[k[index]].description;
            obj.modelValue = qualificationDetails[objkey];
            obj.type = qualificationFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var qualificationEditObj = fromService.convertJsonToArray(editObj);

        $scope.qualificationEditJsonConfig = qualificationEditObj;


    }

    $scope.setqualificationDetailsIdFroDelete = function (mongodbId) {

        $scope.qualificationDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForqualificationSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(qualificationService.getqualificationFromConfig());
        $scope.qualificationJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.getqualificationDetailsByRange(0);
        $scope.getConfigForqualificationSaveFrom()
    }

    init()
});