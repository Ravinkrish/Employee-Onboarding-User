userapp.controller("trainingsetupCtrl", function ($scope, trainingsetupService, fromService) {



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


    $scope.trainingsetupDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.trainingsetupEditJsonConfig = {};
    $scope.emptytrainingsetupFrom = function () {
        $scope.trainingsetupJsonConfig = {}
    };

    $scope.savetrainingsetup = function (trainingsetupDetailsArray) {

        console.log("**************ffffgg***********************");
        console.log("trainingsetup det", trainingsetupDetailsArray);
        var trainingsetupDetailsObj = {};
        savetrainingsetupDetailsToDb(trainingsetupDetailsArray);
        $scope.showhide()
    };

    function savetrainingsetupDetailsToDb(trainingsetupDetails) {
        $scope.unquietrainingsetupNameError = "";
        for (var k = 0; k < trainingsetupDetails.length; k++) {
            console.log(trainingsetupDetails.length);
            //alert(trainingsetupDetails.length)
            if (trainingsetupDetails[k].realName === "Course") {

                var obj = {};
                obj.Name = trainingsetupDetails[k].modelValue;
                trainingsetupService.gettrainingsetupDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquietrainingsetupNameError = "company name already exists";
                        console.log($scope.unquietrainingsetupNameError)


                    }
                    else {


                        var saveObj = {};
                        var trainingsetupSaveObj = {};
                        for (var k = 0; k < trainingsetupDetails.length; k++) {

                            saveObj = trainingsetupDetails[k];
                            trainingsetupSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === trainingsetupDetails.length - 1) {


                                trainingsetupService.savetrainingsetupDetails(trainingsetupSaveObj).then(function (resultDetails) {


                                        console.log(resultDetails);
                                        $scope.gettrainingsetupDetailsByRange(0)
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

    $scope.gettrainingsetupDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        trainingsetupService.gettrainingsetupDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.trainingsetupDetails.detailsArray = res.data;
        })
    };


    $scope.updatetrainingsetupDetailsToDb = function (trainingsetupDetails) {
        var editObj = {};
        var trainingsetupEditObj = {};
        for (var k = 0; k < trainingsetupDetails.length; k++) {
            editObj = trainingsetupDetails[k];
            trainingsetupEditObj[editObj.realName] = editObj.modelValue;
            if (k === trainingsetupDetails.length - 1) {

                console.log("else");
                console.log(trainingsetupEditObj);
                trainingsetupEditObj.mondbId = $scope.trainingsetupDetails.editDetailsId;
                trainingsetupService.updatetrainingsetupDetails(trainingsetupEditObj).then(function (res) {
                    $scope.trainingsetupDetails.updateMessage = res.data;
                    $scope.gettrainingsetupDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletetrainingsetupDetails = function (trainingsetupMongoDbId) {
        trainingsetupService.deletetrainingsetupDetails(trainingsetupMongoDbId).then(function (res) {
            $scope.trainingsetupDetails.deleteMessage = res.data;
            $scope.gettrainingsetupDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.gettrainingsetupDetailsById = function (trainingsetupDetails) {


        $scope.trainingsetupDetails.editDetailsId = trainingsetupDetails._id;

        MergeEditFrom(trainingsetupDetails, trainingsetupService.gettrainingsetupFromConfig());
        console.log("**********************");
        console.log(trainingsetupDetails);
        console.log(trainingsetupService.gettrainingsetupFromConfig());
        console.log("**********************");
        /* trainingsetupService.gettrainingsetupDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(trainingsetupDetails, trainingsetupFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(trainingsetupFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = trainingsetupFromConfig[k[index]].description;
            obj.modelValue = trainingsetupDetails[objkey];
            obj.type = trainingsetupFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var trainingsetupEditObj = fromService.convertJsonToArray(editObj);

        $scope.trainingsetupEditJsonConfig = trainingsetupEditObj;


    }

    $scope.settrainingsetupDetailsIdFroDelete = function (mongodbId) {

        $scope.trainingsetupDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigFortrainingsetupSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(trainingsetupService.gettrainingsetupFromConfig());
        $scope.trainingsetupJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.gettrainingsetupDetailsByRange(0);
        $scope.getConfigFortrainingsetupSaveFrom()
    }

    init()
});
