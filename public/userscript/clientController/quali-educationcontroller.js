userapp.controller("educationCtrl", function ($scope, educationService, fromService) {
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
            alert("Something gone wrong");

        }
        $scope.companies.splice(index, 1);
    };

    $scope.displayRow = function (company) {
        $scope.displaydata = this.company;

    };

    $scope.sortcolumn = "name";
    $scope.reversesort = false;

    $scope.sortdata = function (column) {
        $scope.reversesort = ($scope.sortcolumn == column) ? !$scope.reversesort : false;
        $scope.sortcolumn = column;
    };
    $scope.getsortclass = function (column) {
        if ($scope.sortcolumn == column) {
            return $scope.reversesort ? 'arrow-down' : 'arrow-up'
        }
        return '';
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


    $scope.educationDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.educationEditJsonConfig = {};
    $scope.emptyeducationFrom = function () {
        $scope.educationJsonConfig = {}
    };

    $scope.saveeducation = function (educationDetailsArray) {
        console.log("**************ffffgg***********************");
        console.log("education det", educationDetailsArray);
        var educationDetailsObj = {};
        saveeducationDetailsToDb(educationDetailsArray);
        $scope.showhide()
    };

    function saveeducationDetailsToDb(educationDetails) {
        $scope.unquieeducationNameError = "";
        for (var k = 0; k < educationDetails.length; k++) {
            console.log(educationDetails.length);
            //alert(educationDetails.length)
            if (educationDetails[k].realName === "Designation") {

                var obj = {};
                obj.Name = educationDetails[k].modelValue;
                educationService.geteducationDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieeducationNameError = "company name already exists";
                        console.log($scope.unquieeducationNameError)


                    }
                    else {


                        var saveObj = {};
                        var educationSaveObj = {};
                        for (var k = 0; k < educationDetails.length; k++) {

                            saveObj = educationDetails[k];
                            educationSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === educationDetails.length - 1) {
                                educationService.saveeducationDetails(educationSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.geteducationDetailsByRange(0)
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

    $scope.geteducationDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        educationService.geteducationDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.educationDetails.detailsArray = res.data;
        })
    };


    $scope.updateeducationDetailsToDb = function (educationDetails) {
        var editObj = {};
        var educationEditObj = {};
        for (var k = 0; k < educationDetails.length; k++) {
            editObj = educationDetails[k];
            educationEditObj[editObj.realName] = editObj.modelValue;
            if (k === educationDetails.length - 1) {
                console.log("else");
                console.log(educationEditObj);
                educationEditObj.mondbId = $scope.educationDetails.editDetailsId;
                educationService.updateeducationDetails(educationEditObj).then(function (res) {
                    $scope.educationDetails.updateMessage = res.data;
                    $scope.geteducationDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deleteeducationDetails = function (educationMongoDbId) {
        educationService.deleteeducationDetails(educationMongoDbId).then(function (res) {
            $scope.educationDetails.deleteMessage = res.data;
            $scope.geteducationDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.geteducationDetailsById = function (educationDetails) {


        $scope.educationDetails.editDetailsId = educationDetails._id;

        MergeEditFrom(educationDetails, educationService.geteducationFromConfig());
        console.log("**********************");
        console.log(educationDetails);
        console.log(educationService.geteducationFromConfig());
        console.log("**********************");
        /* educationService.geteducationDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(educationDetails, educationFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(educationFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = educationFromConfig[k[index]].description;
            obj.modelValue = educationDetails[objkey];
            obj.type = educationFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var educationEditObj = fromService.convertJsonToArray(editObj);

        $scope.educationEditJsonConfig = educationEditObj;


    }

    $scope.seteducationDetailsIdFroDelete = function (mongodbId) {

        $scope.educationDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForeducationSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(educationService.geteducationFromConfig());
        $scope.educationJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.geteducationDetailsByRange(0);
        $scope.getConfigForeducationSaveFrom()
    }

    init()
});