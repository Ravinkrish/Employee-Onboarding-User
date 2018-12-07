userapp.controller("employeementCtrl", function ($scope, employeementService, fromService) {
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


    $scope.employeementDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.employeementEditJsonConfig = {};
    $scope.emptyemployeementFrom = function () {
        $scope.employeementJsonConfig = {}
    };

    $scope.saveemployeement = function (employeementDetailsArray) {
        console.log("**************ffffgg***********************");
        console.log("employeement det", employeementDetailsArray);
        var employeementDetailsObj = {};
        saveemployeementDetailsToDb(employeementDetailsArray);
        $scope.showhide()
    };

    function saveemployeementDetailsToDb(employeementDetails) {
        $scope.unquieemployeementNameError = "";
        for (var k = 0; k < employeementDetails.length; k++) {
            console.log(employeementDetails.length);
            //alert(employeementDetails.length)
            if (employeementDetails[k].realName === "EmployeementStatus") {

                var obj = {};
                obj.Name = employeementDetails[k].modelValue;
                employeementService.getemployeementDetailsByName(obj).then(function (res) {

//                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieemployeementNameError = "EmployeementStatus already exists";
                        console.log($scope.unquieemployeementNameError)
                  }
                    else {


                        var saveObj = {};
                        var employeementSaveObj = {};
                        for (var k = 0; k < employeementDetails.length; k++) {

                            saveObj = employeementDetails[k];
                            employeementSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === employeementDetails.length - 1) {
                                employeementService.saveemployeementDetails(employeementSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getemployeementDetailsByRange(0)
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

    $scope.getemployeementDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        employeementService.getemployeementDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.employeementDetails.detailsArray = res.data;
        })
    };


    $scope.updateemployeementDetailsToDb = function (employeementDetails) {
        var editObj = {};
        var employeementEditObj = {};
        for (var k = 0; k < employeementDetails.length; k++) {
            editObj = employeementDetails[k];
            employeementEditObj[editObj.realName] = editObj.modelValue;
            if (k === employeementDetails.length - 1) {
                console.log("else");
                console.log(employeementEditObj);
                employeementEditObj.mondbId = $scope.employeementDetails.editDetailsId;
                employeementService.updateemployeementDetails(employeementEditObj).then(function (res) {
                    $scope.employeementDetails.updateMessage = res.data;
                    $scope.getemployeementDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deleteemployeementDetails = function (employeementMongoDbId) {
        employeementService.deleteemployeementDetails(employeementMongoDbId).then(function (res) {
            $scope.employeementDetails.deleteMessage = res.data;
            $scope.getemployeementDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getemployeementDetailsById = function (employeementDetails) {


        $scope.employeementDetails.editDetailsId = employeementDetails._id;

        MergeEditFrom(employeementDetails, employeementService.getemployeementFromConfig());
        console.log("**********************");
        console.log(employeementDetails);
        console.log(employeementService.getemployeementFromConfig());
        console.log("**********************");
        /* employeementService.getemployeementDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(employeementDetails, employeementFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(employeementFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = employeementFromConfig[k[index]].description;
            obj.modelValue = employeementDetails[objkey];
            obj.type = employeementFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var employeementEditObj = fromService.convertJsonToArray(editObj);

        $scope.employeementEditJsonConfig = employeementEditObj;


    }

    $scope.setemployeementDetailsIdFroDelete = function (mongodbId) {

        $scope.employeementDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForemployeementSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(employeementService.getemployeementFromConfig());
        $scope.employeementJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.getemployeementDetailsByRange(0);
        $scope.getConfigForemployeementSaveFrom()
    }

    init()
});