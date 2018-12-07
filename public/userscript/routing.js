var userapp=angular.module('userApp', ['ng-webcam','ui.router','angularFromUI','angularEditFromUI','angularUtils.directives.dirPagination','ui.bootstrap', 'ui.bootstrap.datetimepicker']);
userapp.run(function(jobdetailsservice,trainingsetupService,qualificationService,projectclientService,projectService,payGradeService,userprojectsService,employeementService,educationService,certificationService,languageService,trainsessionService,userallmytimesheetsService,userapprovedtimesheetsService, userpendingtimesheetsService,employeeService,clientService){


function getClientJsonConfig() {
        clientService.getClientJsonConfig().then(function (resultDetails) {
            clientService.setClientFromConfig(resultDetails.data)
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }



    function getjobDetailsJsonConfig() {
        jobdetailsservice.getjobdetailsJsonConfig().then(function (resultDetails) {
            jobdetailsservice.setjobdetailsFromConfig(resultDetails.data)
            console.log(resultDetails.data)
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })

    }

    function gettrainingsetupJsonConfig() {
        trainingsetupService.gettrainingsetupJsonConfig().then(function (resultDetails) {
            trainingsetupService.settrainingsetupFromConfig(resultDetails.data);
            console.log(resultDetails.data)
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })

    }


    function getqualificationDetailsJsonConfig() {
        qualificationService.getqualificationJsonConfig().then(function (resultDetails) {
            qualificationService.setqualificationFromConfig(resultDetails.data)
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })

    }



    function getprojectclientDetailsJsonConfig() {
        projectclientService.getprojectclientJsonConfig().then(function (resultDetails) {
        projectclientService.setprojectclientFromConfig(resultDetails.data)
        console.log(resultDetails.data)
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })

    }

    function getprojectDetailsJsonConfig() {
        projectService.getprojectJsonConfig().then(function (resultDetails) {
            projectService.setprojectFromConfig(resultDetails.data);
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }


    function getpayGradeDetailsJsonConfig() {
        payGradeService.getpayGradeJsonConfig().then(function (resultDetails) {
            payGradeService.setpayGradeFromConfig(resultDetails.data);
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })


    }




    function getemployeementDetailsJsonConfig() {
        employeementService.getemployeementJsonConfig().then(function (resultDetails) {
            employeementService.setemployeementFromConfig(resultDetails.data);
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }

    function geteducationDetailsJsonConfig() {
        educationService.geteducationJsonConfig().then(function (resultDetails) {
            educationService.seteducationFromConfig(resultDetails.data);
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }

    function getcertificationDetailsJsonConfig() {
        certificationService.getcertificationJsonConfig().then(function (resultDetails) {
            certificationService.setcertificationFromConfig(resultDetails.data);
             console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }


    function getlanguageDetailsJsonConfig() {
        languageService.getlanguageJsonConfig().then(function (resultDetails) {
            languageService.setlanguageFromConfig(resultDetails.data);
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }


    function gettrainingsessionDetailsJsonConfig() {
        trainsessionService.gettrainsessionJsonConfig().then(function (resultDetails) {
            trainsessionService.settrainsessionFromConfig(resultDetails.data);
            console.log(resultDetails.data);
        }, function error(errResponse) {
            console.log("cannot get settings config")
        })
    }




function getuserprojectsJsonConfig() {
              userprojectsService.getuserprojectsJsonConfig().then(function (resultDetails) {
              userprojectsService.setuserprojectsFromConfig(resultDetails.data)
              console.log(resultDetails.data);
              }, function error(errResponse) {
               console.log("cannot get settings config")
               		})
               	}
function getuserallmytimesheetsJsonConfig() {
                userallmytimesheetsService.getuserallmytimesheetsJsonConfig().then(function (resultDetails) {
                userallmytimesheetsService.setuserallmytimesheetsFromConfig(resultDetails.data)
                console.log(resultDetails.data);
                }, function error(errResponse) {
                 console.log("cannot get settings config")
                 		})
                 	}
function getuserapprovedtimesheetsJsonConfig() {
                userapprovedtimesheetsService.getuserapprovedtimesheetsJsonConfig().then(function (resultDetails) {
                userapprovedtimesheetsService.setuserapprovedtimesheetsFromConfig(resultDetails.data)
                console.log(console.log);
                }, function error(errResponse) {
                 console.log("cannot get settings config")
                 		})
                 	}

function getuserpendingtimesheetsJsonConfig() {
                userpendingtimesheetsService.getuserpendingtimesheetsJsonConfig().then(function (resultDetails) {
                userpendingtimesheetsService.setuserpendingtimesheetsFromConfig(resultDetails.data)
                console.log(resultDetails.data)
                }, function error(errResponse) {
                 console.log("cannot get settings config")
                 		})
                 	}
function getemployeeDetailsJsonConfig() {
            employeeService.getemployeeJsonConfig().then(function (resultDetails) {
                employeeService.setemployeeFromConfig(resultDetails.data);
                console.log(resultDetails.data)
            }, function error(errResponse) {
                console.log("cannot get settings config")
            })
        }





function init(){
   getClientJsonConfig();
   getjobDetailsJsonConfig();
   gettrainingsetupJsonConfig();
   getqualificationDetailsJsonConfig();
   getprojectclientDetailsJsonConfig();
   getpayGradeDetailsJsonConfig();
   geteducationDetailsJsonConfig();
   getemployeementDetailsJsonConfig();
   getcertificationDetailsJsonConfig();
   gettrainingsessionDetailsJsonConfig();
   getlanguageDetailsJsonConfig();
   getuserprojectsJsonConfig();
   getuserallmytimesheetsJsonConfig();
   getuserapprovedtimesheetsJsonConfig();
   getuserpendingtimesheetsJsonConfig();
   getemployeeDetailsJsonConfig();

               }
 init();
});


userapp.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/login');


$stateProvider
.state('login', {
               url: '/login',
                templateUrl: 'user/login.html',
                     controller:'loginController'
                })


$stateProvider
    .state('dashboard', {
      url: "/dashboard",
              templateUrl:'user/dashboard.html',
              controller:'dashboardCtrl'
              })

$stateProvider
    .state('basicinformation',{
	url:"/basicinformation",
	templateUrl: 'user/basicInformation.html'
                        })

  $stateProvider
      .state('basicinformation.mydetails',{
  	url:"/mydetails",
  	templateUrl:'user/myDetails.html'
  })


  .state('basicinformation.companystructure', {
              url: "/companystructure",
              templateUrl:'user/companystructure.html',
               controller:'CompanystructureCtrl'
               })

  $stateProvider
      .state('basicinformation.usercompany',{
  	url:"/usercompany",
  	templateUrl:'user/usercompany.html',
  	controller:'companygraphController'
  })



        .state('qualification', {
            url: "/qualification",
            templateUrl: 'user/qualificationsetup.html'
            })
        .state('qualification.skills', {
            url: "/skills",
            templateUrl: 'user/skills.html',
            controller: 'qualificationCtrl'
             })

        .state('qualification.education', {
            url: "/education",
            templateUrl: 'user/quali-education.html',
            controller: 'educationCtrl'

        })
        .state('qualification.certification', {
            url: "/certification",
            templateUrl: 'user/certification.html',
            controller: 'certificationCtrl'

        })
        .state('qualification.language', {
            url: "/language",
            templateUrl: 'user/languages.html',
            controller: 'languageCtrl'
        })

        .state('jobdetailssetup', {
            url: "/jobdetailssetup",
                templateUrl: 'user/jobdetailssetup.html'
            })

        .state('jobdetailssetup.jobdetails', {
            url: "/jobdetails",
            templateUrl: 'user/jobdetails.html',
            controller: 'jobdetailscontroller'

        })
        .state('jobdetailssetup.paygrade', {
            url: "/paygrade",
            templateUrl: 'user/paygrade.html',
            controller: 'payGradeCtrl'
        })


        .state('jobdetailssetup.employeement', {
            url: "/employeement",
            templateUrl: 'user/employeementstatus.html',
            controller: 'employeementCtrl'
        })


        .state('trainingsetup', {
            url: "/trainingsetup",
            templateUrl: 'user/trainingsetup.html'
            })

        .state('trainingsetup.courses', {
            url: "/courses",
            templateUrl: 'user/courses.html',
            controller: 'trainingsetupCtrl'
        })

        .state('trainingsetup.trainingsession', {
            url: "/trainsession",
            templateUrl: 'user/trainingsession.html',
            controller: 'trainsessionCtrl'
        })


        .state('projectclient', {
            url: "/projectclient",
           templateUrl: 'user/projectclient.html'
         })
        .state('projectclient.client', {
            url: "/clients",
            templateUrl: 'user/projectclientclient.html',
            controller: 'projectclientCtrl'
        })
        .state('projectclient.project', {
            url: "/project",
            templateUrl: 'user/project.html',
            controller: 'projectCtrl'
        })



$stateProvider
    .state('admindetails',{
	url:"/admindetails",
	templateUrl:'user/admindetails.html',
	controller:'employeeCtrl'

})

$stateProvider
    .state('userdetails',{
	url:"/usedertails",
	templateUrl:'user/userdetails.html',
	controller:'employeeCtrl'
})


$stateProvider
    .state('userdetailsedit',{
	url:"/userdetailsedit",
	templateUrl:'user/userdetailsedit.html',
	controller:'employeeCtrl'
})







$stateProvider
    .state('projectinformation',{
	url:"/projectinformation",
	templateUrl:'user/projectinformation.html',
	abstract:true
})

$stateProvider
    .state('projectinformation.userprojects',{
	url:"/userprojects",
	templateUrl:'user/userprojects.html',
	controller:'userprojectsCtrl'
})

$stateProvider
    .state('projectinformation.projectmeetingfollowup',{
	url:"/projectmeetingfollowup",
	templateUrl:'user/projectmeetingfollowup.html',
	controller:'userprojectsCtrl'
})


$stateProvider
    .state('usertimesheets',{
	url:"/usertimesheets",
	templateUrl: 'user/usertimesheet.html'
})
$stateProvider
    .state('usertimesheets.userallmytimesheets',{
	url:"/userallmytimesheets",
	templateUrl:'user/userallmytimesheets.html',
	controller:'userallmytimesheetsCtrl'
})
$stateProvider
    .state('usertimesheets.userapprovedtimesheets',{
	url:"/userapprovedtimesheets",
	templateUrl:'user/userapprovedtimesheets.html',
	controller:'userallmytimesheetsCtrl'
})
$stateProvider
    .state('usertimesheets.userpendingtimesheets',{
	url:"/userpendingtimesheets",
	templateUrl:'user/userpendingtimesheets.html',
	controller:'userallmytimesheetsCtrl'
})

$stateProvider
    .state('hrform',{
	url:"/hrform",
	templateUrl:'user/hrform.html',
	abstract:true
})

$stateProvider
    .state('hrform.userhrformreleave',{
	url:"/userhrformreleave",
	templateUrl:'user/userreleave.html',
	controller:'releaveCtrl'
})



});



angular.module('userApp').directive('exportTable', function () {
    var link = function ($scope, element, attr) {
            $scope.$on('export-pdf',function(e,d){
            element.exportDetails({ type:'pdf', escape: false });
            })

            $scope.$on('export-excel', function(e,d){
                element.exportDetails({ type:'excel', escape: false });
            });
            $scope.$on('export-doc',function(e,d){
                element. exportDetails({ type:'doc', escape: false});
            });
            $scope.$on('export-csv', function(e,d){
                element. exportDetails({ type:'csv', escape:false });
            });
    }
    return {
        restrict:'A',
        link:link
    };
});

