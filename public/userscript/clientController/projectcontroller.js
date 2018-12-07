userapp.controller("projectCtrl", function ($scope, projectService, fromService,projectclientService,employeeService) {

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


    $scope.projectDetails = {
        detailsArray: [],
        updateMessage: "",
        deleteMessage: "",
        mongodbIdForDelete: "",
        editDetailsId: ""
    };

    $scope.projectEditJsonConfig = {};
    $scope.emptyprojectFrom = function () {
        $scope.projectJsonConfig = {}
    };

    $scope.saveproject = function (projectDetails) {
    var projectDetailsArray=[];
    projectDetailsArray.push(projectDetails)
        console.log("**************ffffgg***********************");
        console.log("project det", projectDetailsArray);
        var projectDetailsObj = {};
        saveprojectDetailsToDb(projectDetailsArray);
        $scope.showhide()
    };

    function saveprojectDetailsToDb(projectDetails) {
        $scope.unquieprojectNameError = "";
        for (var k = 0; k<projectDetails.length; k++) {
            console.log(projectDetails.length);
            for(projectname in projectDetails[k])
            {
            //alert(projectDetails.length)
            if (projectname=="Nameoftheproject") {

                var obj = {};
                obj.Name = projectDetails[k].Nameoftheproject;
                projectService.getprojectDetailsByName(obj).then(function (res) {

                    console.log("hey already", res.data[0]);
                    if (res.data[0]) {


                        $scope.unquieprojectNameError = "company name already exists";
                        console.log($scope.unquieprojectNameError)


                    }
                    else {


                        var saveObj = {};
                        var projectSaveObj = {};
                        for (var k = 0; k < projectDetails.length; k++) {

                            saveObj = projectDetails[k];
//                            projectSaveObj[saveObj.realName] = saveObj.modelValue;
                            if (k === projectDetails.length - 1) {
                            console.log("inside");
                                projectService.saveprojectDetails(saveObj).then(function (resultDetails) {

                                        console.log(resultDetails);
                                        $scope.getprojectDetailsByRange(0)
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


    }

    $scope.getprojectDetailsByRange = function (pageNo) {

        var pageCapacity = 10;
        var start = 0;
        projectService.getprojectDetailsByRange(start, pageCapacity).then(function (res) {
            $scope.projectDetails.detailsArray = res.data;
        })
    };


    $scope.updateprojectDetailsToDb = function (projectDetails) {
        var editObj = {};
        var projectEditObj = {};
        for (var k = 0; k < projectDetails.length; k++) {
            editObj = projectDetails[k];
            projectEditObj[editObj.realName] = editObj.modelValue;
            if (k === projectDetails.length - 1) {
                console.log("else");
                console.log(projectEditObj);
                projectEditObj.mondbId = $scope.projectDetails.editDetailsId;
                projectService.updateprojectDetails(projectEditObj).then(function (res) {
                    $scope.projectDetails.updateMessage = res.data;
                    $scope.getprojectDetailsByRange(0)
                })
            }


        }


        $scope.showhide2()
    };
    $scope.deleteprojectDetails = function (projectMongoDbId) {
        projectService.deleteprojectDetails(projectMongoDbId).then(function (res) {
            $scope.projectDetails.deleteMessage = res.data;
            $scope.getprojectDetailsByRange(0);
            $('#btnClose').click();
        })
    };

    $scope.getprojectDetailsById = function (projectDetails) {


        $scope.projectDetails.editDetailsId = projectDetails._id;

        MergeEditFrom(projectDetails, projectService.getprojectFromConfig());
        console.log("**********************");
        console.log(projectDetails);
        console.log(projectService.getprojectFromConfig());
        console.log("**********************");
        /* projectService.getprojectDetailsById(mongodbId).then(function(res){

         })*/

        $scope.showhide2()
    };

    function MergeEditFrom(projectDetails, projectFromConfig) {
        var obj = {};
        var editObj = {};
        var k = Object.keys(projectFromConfig);
        k.forEach(function (objkey, index) {
            var obj = {};
            obj.description = projectFromConfig[k[index]].description;
            obj.modelValue = projectDetails[objkey];
            obj.type = projectFromConfig[k[index]].type;
            editObj[objkey] = obj
        });

        var projectEditObj = fromService.convertJsonToArray(editObj);

        $scope.projectEditJsonConfig = projectEditObj;


    }

    $scope.setprojectDetailsIdFroDelete = function (mongodbId) {

        $scope.projectDetails.mongodbIdForDelete = mongodbId;

    };
    $scope.getConfigForprojectSaveFrom = function () {
        var modifiedSaveConfig = fromService.convertJsonToArray(projectService.getprojectFromConfig());
        $scope.projectJsonConfig = modifiedSaveConfig

    };
    $scope.getprojectclientlist=function()
    {
        $scope.clientlist = [];

    projectclientService.getAllprojectclientName().then(function(res){
    $scope.clientlists=res.data;
//    console.log($scope.clientlist);
    for(var i=0; i<$scope.clientlists.length; i++) {
                      $scope.clientlist.push($scope.clientlists[i].Name);
        //              console.log( $scope.paymentmode);
                   }
    });
    }



$scope.getemployeeNameAndForDropDown=function(){
var employeeNameId=[];
var employeeNameList=[];
var employeeIdList=[];
employeeService.getAllemployeeName().then(function(res){
        employeeNameId=res.data;
        console.log(employeeNameId.length);
        for(i=0;i<employeeNameId.length;i++)
        {

     console.log(i)
     console.log(employeeNameId[i])
       employeeNameList.push(employeeNameId[i].Name);
        employeeIdList.push(employeeNameId[i].Employeenumber);




        }

 $scope.nameofemployee=employeeNameList;
 $scope.idofemployee=employeeIdList;
 console.log($scope.idofemployee);

  })

}

var projectdata;
$scope.getEmployeePojectWithClient=function()
{
projectService.getAllTheEmployeeIdForTheProject().then(function(result){
projectdata=result.data;
$scope.clientProjectList=[]
for(var k=0;k<projectdata.length;k++)
{
var clientproject={}
clientproject.Clientproject=projectdata[k].Clientproject;
clientproject.Nameoftheproject=projectdata[k].Nameoftheproject;
clientproject._id=projectdata[k]._id;

$scope.clientProjectList.push(clientproject);
}
console.log($scope.clientProjectList);
})

}


$scope.getEmployeeListAccordingToProjectname=function(clientname,projectname)
{
$scope.employeeArr=[];
console.log(clientname,projectname)
//console.log(projectdata);
for(var k=0;k<projectdata.length;k++)
{
var employeeobj={};
if(projectname==projectdata[k].Nameoftheproject&&projectdata[k].Clientproject==clientname)
{
var Employeeid=projectdata[k].Employeeid;
if(Employeeid)
{
 var s=Employeeid.split(",");
employeeobj.Employeeid=s;
}
console.log(employeeobj.Employeeid);
employeeobj.Projectstartdate=projectdata[k].Projectstartdate;
}
$scope.employeeArr.push(employeeobj);
}
console.log($scope.employeeArr);
}


$scope.settingMongodid=function(id)
{
console.log(id);
projectService.sentMongodIdForMeeting(id);
}

$scope.sentLastMeetUp=function(lastmeetup)
{
var mongoid=projectService.getMongodIdForMeeting();
projectService.setLastMeetUp(mongoid,lastmeetup);

}

$scope.dateAndTime=function(dateTime)
{
projectService.setDateAndTime(dateTime);
}


    function init() {
        $scope.getprojectDetailsByRange(0);
        $scope.getConfigForprojectSaveFrom()
         $scope.getprojectclientlist();
         $scope.getemployeeNameAndForDropDown();
        $scope.getEmployeePojectWithClient();
        $scope.getEmployeePojectWithClient();
    }

    init()
});