userapp.controller("CompanystructureCtrl", function ($scope,clientService,fromService) {

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

    $scope.gettingvalue = function (val, ke) {
        var s = val;
        var r = ke;
        if (r !== 'Heads') {
            return s;
        }
        else {
            var s1;
            s1 = s.name;
            return s1;
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


          $scope.formvisible=false;
          $scope.tablevisible=true;
          $scope.showhide=function(){
             $scope.formvisible=$scope.formvisible?false:true;
             $scope.tablevisible=$scope.tablevisible?false:true;
                 };
         $scope.form2visible=false;
         $scope.showhide2=function(){
             $scope.form2visible=$scope.form2visible?false:true;
             $scope.tablevisible=$scope.tablevisible?false:true;
         };


    $scope.clientDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };
    $scope.treeobj = [];
//          $scope.treearray3=[];
//          $scope.treearray2=[];
//          $scope.treearray1=[];

    $scope.clientEditJsonConfig = {};
    $scope.emptyClientFrom = function () {
        $scope.clientJsonConfig = {}
    };

    $scope.saveClient = function (clientDetailsArray) {
        console.log("**************ffffgg***********************");
        console.log("client det", clientDetailsArray);
        var clientDetailsObj = {};
        saveClientDetailsToDb(clientDetailsArray);
        $scope.showhide()

    };

    function saveClientDetailsToDb(clientDetails) {
        $scope.unquieClientNameError = "";
        for (var k = 0; k < clientDetails.length; k++) {
            console.log(clientDetails.length);
            //alert(clientDetails.length)
            if (clientDetails[k].realName === "Name") {

                var obj = {};
                obj.Name = clientDetails[k].modelValue;
                clientService.getClientDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieClientNameError = "company name already exists";
                        console.log($scope.unquieClientNameError)


                    }
                    else {


                        var saveObj = {};
                        var clientSaveObj = {};
                        for (var k = 0; k < clientDetails.length; k++) {

                            saveObj = clientDetails[k];
                            clientSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === clientDetails.length - 1) {
                                clientService.saveClientDetails(clientSaveObj).then(function (resultDetails) {

                                        console.log(resultDetails);


                                        $scope.getClientDetailsByRange(0)
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

    $scope.getClientDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        clientService.getClientDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.clientDetails.detailsArray = res.data;
//                jQuery('#success').click();

        })
    };


    $scope.updateClientDetailsToDb = function (clientDetails) {
        var editObj = {};
        var clientEditObj = {};
        for (var k = 0; k < clientDetails.length; k++) {
            editObj = clientDetails[k];
            clientEditObj[editObj.realName] = editObj.modelValue;
            if (k === clientDetails.length - 1) {
                console.log("else");
                console.log(clientEditObj);
                clientEditObj.mondbId = $scope.clientDetails.editDetailsId;
                clientService.updateClientDetails(clientEditObj).then(function (res) {
                    $scope.clientDetails.updateMessage = res.data;
                    $scope.getClientDetailsByRange(0)
                    jQuery('#info').click();

                })
            }


        }


        $scope.showhide2()
    };
    $scope.deleteClientDetails = function (clientMongoDbId) {
        clientService.deleteClientDetails(clientMongoDbId).then(function (res) {
            $scope.clientDetails.deleteMessage = res.data;
            $scope.getClientDetailsByRange(0);
            $('#btnClose').click();

        })

    };

    $scope.getClientDetailsById = function (clientDetails) {


        $scope.clientDetails.editDetailsId = clientDetails._id;


        MergeEditFrom(clientDetails, clientService.getClientFromConfig());
        console.log("**********************");
        console.log(clientDetails);
        console.log(clientService.getClientFromConfig());
        console.log("**********************");
        $scope.showhide2()

    };

    function MergeEditFrom(clientDetails, clientFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(clientFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = clientFromConfig[k[index]].description;
            obj.modelValue = clientDetails[objkey];
            obj.type = clientFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var clientEditObj = fromService.convertJsonToArray(editObj);

        $scope.clientEditJsonConfig = clientEditObj;


    }

    $scope.setClientDetailsIdFroDelete = function (mongodbId) {

        $scope.clientDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForClientSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(clientService.getClientFromConfig());
        $scope.clientJsonConfig = modifiedSaveConfig

    };


    function init() {
        $scope.getClientDetailsByRange(0);
        $scope.getConfigForClientSaveFrom()
        /* $scope.companytreestructure()*/
//         $scope.gettingdatafortree()
    }

    init()
});