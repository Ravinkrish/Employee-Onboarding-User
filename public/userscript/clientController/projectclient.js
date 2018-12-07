userapp.controller("projectclientCtrl", function ($scope, projectclientService, fromService) {


 $scope.exportAction = function (option){
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


    $scope.projectclientDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.projectclientEditJsonConfig = {};
//    $scope.emptyprojectclientFrom = function () {
//        $scope.projectclientJsonConfig = {}
//    };


    $scope.saveprojectclient = function (projectclientDetailsArray) {

        console.log("**************ffffgg***********************");
        console.log("client det", projectclientDetailsArray);
        var projectclientDetailsObj = {};
        saveprojectclientDetailsToDb(projectclientDetailsArray);
        $scope.showhide()
    };

    function saveprojectclientDetailsToDb(projectclientDetails) {
        $scope.unquieClientNameError = "";
        for (var k = 0; k < projectclientDetails.length; k++) {
            console.log(projectclientDetails.length);
            //alert(clientDetails.length)
            if (projectclientDetails[k].realName === "Name") {

                var obj = {};
                obj.Name = projectclientDetails[k].modelValue;
                projectclientService.getprojectclientDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieClientNameError = "company name already exists";
                        console.log($scope.unquieClientNameError)


                    }
                    else {


                        var saveObj = {};
                        var projectclientSaveObj = {};
                        for (var k = 0; k < projectclientDetails.length; k++) {

                            saveObj = projectclientDetails[k];
                            projectclientSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === projectclientDetails.length - 1) {
                                projectclientService.saveprojectclientDetails(projectclientSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getprojectclientDetailsByRange(0)
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

    $scope.getprojectclientDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        projectclientService.getprojectclientDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.projectclientDetails.detailsArray = res.data;
        })
    };


    $scope.updateprojectclientDetailsToDb = function (projectclientDetails) {
        var editObj = {};
        var projectclientEditObj = {};
        for (var k = 0; k < projectclientDetails.length; k++) {
            editObj = projectclientDetails[k];
            projectclientEditObj[editObj.realName] = editObj.modelValue;
            if (k === projectclientDetails.length - 1) {
                console.log("else");
                console.log(projectclientEditObj);
                projectclientEditObj.mondbId = $scope.projectclientDetails.editDetailsId;
                projectclientService.updateprojectclientDetails(projectclientEditObj).then(function (res) {
                    $scope.projectclientDetails.updateMessage = res.data;
                    $scope.getprojectclientDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deleteprojectclientDetails = function (projectclientMongoDbId) {
        projectclientService.deleteprojectclientDetails(projectclientMongoDbId).then(function (res) {
            $scope.projectclientDetails.deleteMessage = res.data;
            $scope.getprojectclientDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getprojectclientDetailsById = function (projectclientDetails) {


        $scope.projectclientDetails.editDetailsId = projectclientDetails._id;

        MergeEditFrom(projectclientDetails, projectclientService.getprojectclientFromConfig());
        console.log("**********************");
        console.log(projectclientDetails);
        console.log(projectclientService.getprojectclientFromConfig());
        console.log("**********************");
        /* clientService.getClientDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(projectclientDetails, projectclientFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(projectclientFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = projectclientFromConfig[k[index]].description;
            obj.modelValue = projectclientDetails[objkey];
            obj.type = projectclientFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var projectclientEditObj = fromService.convertJsonToArray(editObj);

        $scope.projectclientEditJsonConfig = projectclientEditObj;


    }

    $scope.setprojectclientDetailsIdFroDelete = function (mongodbId) {

        $scope.projectclientDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForprojectclientSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(projectclientService.getprojectclientFromConfig());
        $scope.projectclientJsonConfig = modifiedSaveConfig

    };

    function init() {
        $scope.getprojectclientDetailsByRange(0);
        $scope.getConfigForprojectclientSaveFrom()
    }

    init()
});