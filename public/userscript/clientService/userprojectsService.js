/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("userprojectsService", function ($http) {
var totalArray=[];


var firstMonthArray=[];
var secMonthArray=[];
var thirdMonthArray=[];
var fourthMonthArray=[];
var fiveMonthArray=[];
var sixtMonthArray=[];
var sevenMonthArray=[];
var eightMonthArray=[];
var nineMonthArray=[];
var tenMonthArray=[];
var elevenMonthArray=[];
var twelMonthArray=[];

    var formConfigObj={};
    var userprojectsCount;

    var getuserprojectsJsonConfig = function(){

        return $http.get('/userprojectsJsonConfig');
    }
    var setuserprojectsFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getuserprojectsFromConfig=function(){
        return formConfigObj
    }

    var saveuserprojectsDetails = function(userprojectsData){
        return $http.post('/userprojectsDetails',userprojectsData);
    }
    var getuserprojectsDetailsByRange=function(start,range){
        return $http.get('/userprojectsDetails/'+start+'/'+range);
    }
    var getuserprojectsDetailsCount = function(){
        return $http.get('/userprojectsDetails/count');
    }
    var getuserprojectsCount = function(){
        return userprojectsCount;
    }
    var setuserprojectsCount = function(val){
        userprojectsCount=val;
    }
    var updateuserprojectsDetails = function(companyDetails){
        return $http.post('/userprojectsDetails/update',companyDetails)
    }
    var deleteuserprojectsDetails = function(id){
        return $http.delete('/userprojectsDetails/'+id);
    }
    var getuserprojectsDetailsById = function(id){
        return $http.get('/userprojectsDetails/'+id);
    }

    var getuserprojectsDetailsByName = function(userprojectsName){
        return $http.post('/userprojectsDetails/name',userprojectsName);
    }

    var getAlluserprojectsName = function(){
        return $http.get('/userprojectsDetailsName');
    }

var getUserProjectByEmployeeId=function(employeeId){
return $http.get('/myProject/'+employeeId);
}

var lastmeetupByEmployeeid=function(employeeid){
return  $http.get('/myProjectlastmeetup/'+employeeid);
}



var getyearlyProjectStatus=function()
{
return  $http.get('/getYearlyProjectStatus');

}



var getyearlyProjectStatusActive=function()
{
return  $http.get('/getYearlyProjectStatusForActive');

}

var getyearlyProjectStatusInactive=function()
{
return  $http.get('/getYearlyProjectStatusForInactive');

}

var getyearlyProjectStatusProduction=function()
{
return  $http.get('/getYearlyProjectStatusForProduction');

}
var getyearlyProjectStatusMaintanence=function()
{
return  $http.get('/getYearlyProjectStatusForMaintanence');

}

var getyearlyProjectStatusSlack=function()
{
return  $http.get('/getYearlyProjectStatusForSlack');

}
//firstMonthArray=[];

var firstMonthArrayvalue=function(arrayValue)
{
firstMonthArray.push(arrayValue);
console.log(firstMonthArray);

console.log(firstMonthArray.length);

}


var getfirstMonthArrayvalue=function()
{
console.log(firstMonthArray);
return firstMonthArray;
}

var secMonthArrayvalue=function(arrayValue)
{
secMonthArray.push(arrayValue);
}

var getsecMonthArrayvalue=function()
{
return secMonthArray
}


var thirdMonthArrayvalue=function(arrayValue)
{
thirdMonthArray.push(arrayValue);
}


var getthirdMonthArrayvalue=function()
{
return thirdMonthArray;
}


var fourthMonthArrayvalue=function(arrayValue)
{
fourthMonthArray.push(arrayValue);
}


var getfourthMonthArrayvalue=function()
{
return fourthMonthArray
}


var fiveMonthArrayvalue=function(arrayValue)
{
fiveMonthArray.push(arrayValue);
}



var getfiveMonthArrayvalue=function()
{
return fiveMonthArray
}

var sixtMonthArrayvalue=function(arrayValue)
{
sixtMonthArray.push(arrayValue);
}


var getsixtMonthArrayvalue=function()
{
return sixtMonthArray
}


var sevenMonthArrayvalue=function(arrayValue)
{
sevenMonthArray.push(arrayValue);
}


var getsevenMonthArrayvalue=function()
{
return sevenMonthArray
}



var eightMonthArrayvalue=function(arrayValue)
{
eightMonthArray.push(arrayValue);
}


var geteightMonthArrayvalue=function()
{
return eightMonthArray
}


var nineMonthArrayvalue=function(arrayValue)
{
nineMonthArray.push(arrayValue);
}


var  getnineMonthArrayvalue=function()
{
return nineMonthArray
}


var tenMonthArrayvalue=function(arrayValue)
{
tenMonthArray.push(arrayValue);
}



var gettenMonthArrayvalue=function()
{
return tenMonthArray
}


var elevenMonthArrayvalue=function(arrayValue)
{
elevenMonthArray.push(arrayValue);
}


var getelevenMonthArrayvalue=function()
{
return elevenMonthArray
}


var twelMonthArrayvalue=function(arrayValue)
{
twelMonthArray.push(arrayValue);
console.log(twelMonthArray);
}


var gettwelMonthArrayvalue=function()
{
return twelMonthArray
}
//
//var totalArrayvalue=function()
//{
// totalArray.push(firstMonthArray,secMonthArray,thirdMonthArray,fourthMonthArray,fiveMonthArray,sixtMonthArray,sevenMonthArray,eightMonthArray,nineMonthArray,tenMonthArray,elevenMonthArray,twelMonthArray)
//
//// totalArray.push(firstMonthArray);
// return totalArray;
//
//}
//
//var getAllArrayValue=function()
//{
//
//console.log(totalArray)
//return totalArray;
//}
//
//
//
//
//

var getHoursSpendOnLiveProject=function()
{
return $http.get('/getAlltheLiveProjectHours');
}
var totalLiveHours;

var setHourOnLiveProject=function(totalHours)
{
console.log(totalHours);
totalLiveHours=totalHours;
}

var getHourOnLiveProject=function()
{
console.log(totalLiveHours)
return totalLiveHours;

}

var getHoursSpendOnMaintanenceProject=function()
{
return $http.get('/getAllTheMaintanenceProjectHours');
}
var totalMaintaHour
var setHourOnMaintaProject=function(totalhours)
{
totalMaintaHour=totalhours;
}

var getHourOnMaintaProject=function()
{
return totalMaintaHour;
}

var getNoOfPeopleInTheLiveProject=function()
{
return $http.get('/getNoOfPeopleInTheLiveProject');
}
var LiveProjectEmployee;
var setNoofEmployeeInTheLiveProject=function(totalPeople)
{
LiveProjectEmployee=totalPeople;
}

var getNoEmployeeInTheLiveProject=function()
{
return LiveProjectEmployee;
}

var getNoOfPeopleInTheMaintanenceProject=function()
{
return $http.get('/getNoOfPeopleInTheMaintanenceProject');
}
var mainProjectEmployee;
var setNoofEmployeeInTheMaintaProject=function(totalPeople)
{
mainProjectEmployee=totalPeople;
}

var getNoEmployeeInTheMaintaProject=function()
{
return mainProjectEmployee;
}

var getCostPerLiveProjectdata=function()
{
return $http.get('/getCostPerLiveProject');
}
var CostLiveProject;
var setCostPerLiveProject=function(totalPeople)
{
CostLiveProject=totalPeople;
}

var getCostPerLiveProject=function()
{
return CostLiveProject;
}

var getCostPerMaintanenceProjectdata=function()
{
return $http.get('/getCostPerMaintanenceProject');
}
var CostMaintanenceProject;
var setCostPerMaintanenceProject=function(totalPeople)
{
CostMaintanenceProject=totalPeople;
}

var getCostPerMaintanenceProject=function()
{
return CostMaintanenceProject;
}

var getEmployeeAllProjectByEmployeeid=function(employeeid)
{
return  $http.get('/getEmployeeAlltheProjectByEmployeeid/'+employeeid);

}







    return{
        getuserprojectsJsonConfig:getuserprojectsJsonConfig,
        setuserprojectsFromConfig:setuserprojectsFromConfig,
        getuserprojectsFromConfig:getuserprojectsFromConfig,
        saveuserprojectsDetails:saveuserprojectsDetails,
        getuserprojectsDetailsByRange:getuserprojectsDetailsByRange,
        getuserprojectsDetailsCount:getuserprojectsDetailsCount,
        getuserprojectsCount:getuserprojectsCount,
        setuserprojectsCount:setuserprojectsCount,
        updateuserprojectsDetails:updateuserprojectsDetails,
        deleteuserprojectsDetails:deleteuserprojectsDetails,
        getuserprojectsDetailsById:getuserprojectsDetailsById,
        getuserprojectsDetailsByName:getuserprojectsDetailsByName,
        getAlluserprojectsName:getAlluserprojectsName,
        getUserProjectByEmployeeId:getUserProjectByEmployeeId,
        lastmeetupByEmployeeid:lastmeetupByEmployeeid,
         getyearlyProjectStatusActive:getyearlyProjectStatusActive,
                getyearlyProjectStatusInactive:getyearlyProjectStatusInactive,
                getyearlyProjectStatusProduction:getyearlyProjectStatusProduction,
                getyearlyProjectStatusMaintanence:getyearlyProjectStatusMaintanence,
                getyearlyProjectStatusSlack:getyearlyProjectStatusSlack,
                getyearlyProjectStatus:getyearlyProjectStatus,
                firstMonthArrayvalue:firstMonthArrayvalue,
                getfirstMonthArrayvalue:getfirstMonthArrayvalue,
                secMonthArrayvalue:secMonthArrayvalue,
                getsecMonthArrayvalue:getsecMonthArrayvalue,
                thirdMonthArrayvalue:thirdMonthArrayvalue,
                getthirdMonthArrayvalue:getthirdMonthArrayvalue,
                fourthMonthArrayvalue:fourthMonthArrayvalue,
                getfourthMonthArrayvalue:getfourthMonthArrayvalue,
                fiveMonthArrayvalue:fiveMonthArrayvalue,
                getfiveMonthArrayvalue:getfiveMonthArrayvalue,
                sixtMonthArrayvalue:sixtMonthArrayvalue,
                getsixtMonthArrayvalue:getsixtMonthArrayvalue,
                sevenMonthArrayvalue:sevenMonthArrayvalue,
                getsevenMonthArrayvalue:getsevenMonthArrayvalue,
                eightMonthArrayvalue:eightMonthArrayvalue,
                geteightMonthArrayvalue:geteightMonthArrayvalue,
                nineMonthArrayvalue:nineMonthArrayvalue,
                getnineMonthArrayvalue:getnineMonthArrayvalue,
                tenMonthArrayvalue:tenMonthArrayvalue,
                gettenMonthArrayvalue:gettenMonthArrayvalue,
                elevenMonthArrayvalue:elevenMonthArrayvalue,
                getelevenMonthArrayvalue:getelevenMonthArrayvalue,
                twelMonthArrayvalue:twelMonthArrayvalue,
                gettwelMonthArrayvalue:gettwelMonthArrayvalue,
                getHoursSpendOnLiveProject:getHoursSpendOnLiveProject,

        //        getAllArrayValue:getAllArrayValue
                setHourOnLiveProject:setHourOnLiveProject,
                getHourOnLiveProject:getHourOnLiveProject,
                getHoursSpendOnMaintanenceProject:getHoursSpendOnMaintanenceProject,
                setHourOnMaintaProject:setHourOnMaintaProject,
                getHourOnMaintaProject:getHourOnMaintaProject,
                getNoOfPeopleInTheLiveProject:getNoOfPeopleInTheLiveProject,
                setNoofEmployeeInTheLiveProject:setNoofEmployeeInTheLiveProject,
                getNoEmployeeInTheLiveProject:getNoEmployeeInTheLiveProject,
                getNoOfPeopleInTheMaintanenceProject:getNoOfPeopleInTheMaintanenceProject,
                setNoofEmployeeInTheMaintaProject:setNoofEmployeeInTheMaintaProject,
                getNoEmployeeInTheMaintaProject:getNoEmployeeInTheMaintaProject,
                getNoOfPeopleInTheMaintanenceProject:getNoOfPeopleInTheMaintanenceProject,
                setNoofEmployeeInTheMaintaProject:setNoofEmployeeInTheMaintaProject,
                getNoEmployeeInTheMaintaProject:getNoEmployeeInTheMaintaProject,
                getCostPerLiveProjectdata:getCostPerLiveProjectdata,
                setCostPerLiveProject:setCostPerLiveProject,
                getCostPerLiveProject:getCostPerLiveProject,
                getCostPerMaintanenceProjectdata:getCostPerMaintanenceProjectdata,
                setCostPerMaintanenceProject:setCostPerMaintanenceProject,
                getCostPerMaintanenceProject:getCostPerMaintanenceProject,
                getEmployeeAllProjectByEmployeeid:getEmployeeAllProjectByEmployeeid


    }






})
