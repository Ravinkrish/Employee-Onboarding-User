userapp.controller("trainsessionCtrl", function ($scope, trainsessionService, fromService,trainingsetupService) {

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


    $scope.trainsessionDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.trainsessionEditJsonConfig = {};
    $scope.emptytrainsessionFrom = function () {
        $scope.trainsessionJsonConfig = {}
    };

    $scope.savetrainsession = function (trainsessionDetailsArray) {
        console.log("**************ffffgg***********************");
        console.log("trainsession det", trainsessionDetailsArray);
        var trainsessionDetailsObj = {};
        savetrainsessionDetailsToDb(trainsessionDetailsArray);
        $scope.showhide()
    };

    function savetrainsessionDetailsToDb(trainsessionDetails) {
        $scope.unquietrainsessionNameError = "";
        for (var k = 0; k < trainsessionDetails.length; k++) {
            console.log(trainsessionDetails.length);
            //alert(trainsessionDetails.length)
            if (trainsessionDetails[k].realName === "Name") {

                var obj = {};
                obj.Name = trainsessionDetails[k].modelValue;
                trainsessionService.gettrainsessionDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquietrainsessionNameError = "company name already exists";
                        console.log($scope.unquietrainsessionNameError)


                    }
                    else {


                        var saveObj = {};
                        var trainsessionSaveObj = {};
                        for (var k = 0; k < trainsessionDetails.length; k++) {

                            saveObj = trainsessionDetails[k];
                            trainsessionSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === trainsessionDetails.length - 1) {
                                trainsessionService.savetrainsessionDetails(trainsessionSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.gettrainsessionDetailsByRange(0)
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

    $scope.gettrainsessionDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        trainsessionService.gettrainsessionDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.trainsessionDetails.detailsArray = res.data;
        })
    };


    $scope.updatetrainsessionDetailsToDb = function (trainsessionDetails) {
        var editObj = {};
        var trainsessionEditObj = {};
        for (var k = 0; k < trainsessionDetails.length; k++) {
            editObj = trainsessionDetails[k];
            trainsessionEditObj[editObj.realName] = editObj.modelValue;
            if (k === trainsessionDetails.length - 1) {
                console.log("else");
                console.log(trainsessionEditObj);
                trainsessionEditObj.mondbId = $scope.trainsessionDetails.editDetailsId;
                trainsessionService.updatetrainsessionDetails(trainsessionEditObj).then(function (res) {
                    $scope.trainsessionDetails.updateMessage = res.data;
                    $scope.gettrainsessionDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletetrainsessionDetails = function (trainsessionMongoDbId) {
        trainsessionService.deletetrainsessionDetails(trainsessionMongoDbId).then(function (res) {
            $scope.trainsessionDetails.deleteMessage = res.data;
            $scope.gettrainsessionDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.gettrainsessionDetailsById = function (trainsessionDetails) {


        $scope.trainsessionDetails.editDetailsId = trainsessionDetails._id;

        MergeEditFrom(trainsessionDetails, trainsessionService.gettrainsessionFromConfig());
        console.log("**********************");
        console.log(trainsessionDetails);
        console.log(trainsessionService.gettrainsessionFromConfig());
        console.log("**********************");
        /* trainsessionService.gettrainsessionDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(trainsessionDetails, trainsessionFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(trainsessionFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = trainsessionFromConfig[k[index]].description;
            obj.modelValue = trainsessionDetails[objkey];
            obj.type = trainsessionFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var trainsessionEditObj = fromService.convertJsonToArray(editObj);

        $scope.trainsessionEditJsonConfig = trainsessionEditObj;


    }

    $scope.settrainsessionDetailsIdFroDelete = function (mongodbId) {

        $scope.trainsessionDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigFortrainsessionSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(trainsessionService.gettrainsessionFromConfig());
        $scope.trainsessionJsonConfig = modifiedSaveConfig

    };
    $scope.getlistofcourse=function()
    {
    trainingsetupService.getAlltrainingsetupCourse().then(function (res) {
    $scope.listofcourses=res.data;
    $scope.listofcourse = [];


     for(var i=0; i<$scope.listofcourses.length; i++) {
                          $scope.listofcourse.push($scope.listofcourses[i].Course);
            //              console.log( $scope.paymentmode);
                       }


    })
    }

    function init() {
        $scope.gettrainsessionDetailsByRange(0);
        $scope.getConfigFortrainsessionSaveFrom()
        $scope.getlistofcourse();
    }

    init()
});