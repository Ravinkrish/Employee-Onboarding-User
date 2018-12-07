userapp.controller("jobdetailscontroller", function ($scope, jobdetailsservice, fromService) {



 $scope.exportAction=function(option) {
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


    $scope.jobdetailsDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.jobdetailsEditJsonConfig = {};
    $scope.emptyjobdetailsFrom = function () {
        $scope.jobdetailsJsonConfig = {}

    };

    $scope.savejobdetails = function (jobdetailsDetailsArray) {

        console.log("**************ffffgg***********************");
        console.log("client det", jobdetailsDetailsArray);
        var jobdetailsDetailsObj = {};
        savejobdetailsDetailsToDb(jobdetailsDetailsArray);
        $scope.showhide()
    };

    function savejobdetailsDetailsToDb(jobdetailsDetails) {

        $scope.unquieClientNameError = "";
        for (var k = 0; k < jobdetailsDetails.length; k++) {
            console.log(jobdetailsDetails.length);
            //alert(clientDetails.length)
            if (jobdetailsDetails[k].realName === "Name") {


                var obj = {};
                obj.Name = jobdetailsDetails[k].modelValue;
                jobdetailsservice.getjobdetailsDetailsByName(obj).then(function (res) {


                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieClientNameError = "company name already exists";
                        console.log($scope.unquieClientNameError)


                    }
                    else {


                        var saveObj = {};
                        var jobdetailsSaveObj = {};
                        for (var k = 0; k < jobdetailsDetails.length; k++) {

                            saveObj = jobdetailsDetails[k];
                            jobdetailsSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === jobdetailsDetails.length - 1) {
                                jobdetailsservice.savejobdetailsDetails(jobdetailsSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getjobdetailsDetailsByRange(0)
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

    $scope.getjobdetailsDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        jobdetailsservice.getjobdetailsDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.jobdetailsDetails.detailsArray = res.data;
        })

    };


    $scope.updatejobdetailsDetailsToDb = function (jobdetailsDetails) {
        var editObj = {};
        var jobdetailsEditObj = {};
        for (var k = 0; k < jobdetailsDetails.length; k++) {
            editObj = jobdetailsDetails[k];
            jobdetailsEditObj[editObj.realName] = editObj.modelValue;
            if (k === jobdetailsDetails.length - 1) {
                console.log("else");
                console.log(jobdetailsEditObj);
                jobdetailsEditObj.mondbId = $scope.jobdetailsDetails.editDetailsId;
                jobdetailsservice.updatejobdetailsDetails(jobdetailsEditObj).then(function (res) {
                    $scope.jobdetailsDetails.updateMessage = res.data;
                    $scope.getjobdetailsDetailsByRange(0)

                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletejobdetailsDetails = function (jobdetailsMongoDbId) {
        jobdetailsservice.deletejobdetailsDetails(jobdetailsMongoDbId).then(function (res) {
            $scope.jobdetailsDetails.deleteMessage = res.data;
            $scope.getjobdetailsDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getjobdetailsDetailsById = function (jobdetailsDetails) {


        $scope.jobdetailsDetails.editDetailsId = jobdetailsDetails._id;

        MergeEditFrom(jobdetailsDetails, jobdetailsservice.getjobdetailsFromConfig());
        console.log("**********************");
        console.log(jobdetailsDetails);
        console.log(jobdetailsservice.getjobdetailsFromConfig());
        console.log("**********************");
        /* clientService.getClientDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(jobdetailsDetails, jobdetailsFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(jobdetailsFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = jobdetailsFromConfig[k[index]].description;
            obj.modelValue = jobdetailsDetails[objkey];
            obj.type = jobdetailsFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var jobdetailsEditObj = fromService.convertJsonToArray(editObj);

        $scope.jobdetailsEditJsonConfig = jobdetailsEditObj;


    }

    $scope.setjobdetailsDetailsIdFroDelete = function (mongodbId) {

        $scope.jobdetailsDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForjobdetailsSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(jobdetailsservice.getjobdetailsFromConfig());
        $scope.jobdetailsJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.getjobdetailsDetailsByRange(0);
        $scope.getConfigForjobdetailsSaveFrom()
    }

    init()
});