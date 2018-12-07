userapp.controller("languageCtrl", function ($scope, languageService, fromService) {

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


    $scope.languageDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.languageEditJsonConfig = {};
    $scope.emptylanguageFrom = function () {
        $scope.languageJsonConfig = {}
    };

    $scope.savelanguage = function (languageDetailsArray) {
        console.log("**************ffffgg***********************");
        console.log("language det", languageDetailsArray);
        var languageDetailsObj = {};
        savelanguageDetailsToDb(languageDetailsArray);
        $scope.showhide()
    };

    function savelanguageDetailsToDb(languageDetails) {
        $scope.unquielanguageNameError = "";
        for (var k = 0; k < languageDetails.length; k++) {
            console.log(languageDetails.length);
            //alert(languageDetails.length)
            if (languageDetails[k].realName === "Designation") {

                var obj = {};
                obj.Name = languageDetails[k].modelValue;
                languageService.getlanguageDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquielanguageNameError = "company name already exists";
                        console.log($scope.unquielanguageNameError)

                    }
                    else {

                        var saveObj = {};
                        var languageSaveObj = {};
                        for (var k = 0; k < languageDetails.length; k++) {

                            saveObj = languageDetails[k];
                            languageSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === languageDetails.length - 1) {
                                languageService.savelanguageDetails(languageSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getlanguageDetailsByRange(0)
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

    $scope.getlanguageDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        languageService.getlanguageDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.languageDetails.detailsArray = res.data;
        })
    };


    $scope.updatelanguageDetailsToDb = function (languageDetails) {
        var editObj = {};
        var languageEditObj = {};
        for (var k = 0; k < languageDetails.length; k++) {
            editObj = languageDetails[k];
            languageEditObj[editObj.realName] = editObj.modelValue;
            if (k === languageDetails.length - 1) {
                console.log("else");
                console.log(languageEditObj);
                languageEditObj.mondbId = $scope.languageDetails.editDetailsId;
                languageService.updatelanguageDetails(languageEditObj).then(function (res) {
                    $scope.languageDetails.updateMessage = res.data;
                    $scope.getlanguageDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deletelanguageDetails = function (languageMongoDbId) {
        languageService.deletelanguageDetails(languageMongoDbId).then(function (res) {
            $scope.languageDetails.deleteMessage = res.data;
            $scope.getlanguageDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getlanguageDetailsById = function (languageDetails) {


        $scope.languageDetails.editDetailsId = languageDetails._id;

        MergeEditFrom(languageDetails, languageService.getlanguageFromConfig());
        console.log("**********************");
        console.log(languageDetails);
        console.log(languageService.getlanguageFromConfig());
        console.log("**********************");
        /* languageService.getlanguageDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(languageDetails, languageFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(languageFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = languageFromConfig[k[index]].description;
            obj.modelValue = languageDetails[objkey];
            obj.type = languageFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var languageEditObj = fromService.convertJsonToArray(editObj);

        $scope.languageEditJsonConfig = languageEditObj;


    }

    $scope.setlanguageDetailsIdFroDelete = function (mongodbId) {

        $scope.languageDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForlanguageSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(languageService.getlanguageFromConfig());
        $scope.languageJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.getlanguageDetailsByRange(0);
        $scope.getConfigForlanguageSaveFrom()
    }

    init()
});