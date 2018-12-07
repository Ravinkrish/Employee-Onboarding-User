userapp.controller("dashboardCtrl", function($scope,employeeService,userprojectsService,$timeout){


$scope.projectStatus=function()
{

var Activearray=userprojectsService.getfirstMonthArrayvalue();
var Inactivearray=userprojectsService.getsecMonthArrayvalue();
var productionarray=userprojectsService.getthirdMonthArrayvalue();
var maintanencearray=userprojectsService.getfourthMonthArrayvalue();
var slackarray=userprojectsService.getfiveMonthArrayvalue();
//console.log(firstarray);
//$scope.secArray=userprojectsService.getsecMonthArrayvalue();
 $scope.arrayvaluess=[
    {
            name: 'Slack',
            data:slackarray
     },
    {
            name: 'Maintanence',
            data:maintanencearray
     },
    {
        name: 'Production',
        data:productionarray
    }, {
        name: 'Inactive',
        data:Inactivearray
    },
       {
            name: 'Active',
            data:Activearray
        }];
//console.log($scope.firstarray);
Highcharts.chart('projectStatus', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'PROJECT STATUS IN A YEAR'
    },
    xAxis: {
        categories: ['Jan', 'FEB', 'MAR', 'APRIL', 'MAY','Jun','JUL','AUG','SEP','OCT','NOV','DEC'],
         title: {
                    text: 'Months'
                    //align: 'center'
                }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'PROJECT STATUS'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series:$scope.arrayvaluess
});
}

$scope.hoursSpentOnLiveProject=function()
{
//console.log(fullHoursData);
var yu=userprojectsService.getHourOnLiveProject();
console.log(yu);
if(yu)
{
console.log(yu);
Highcharts.chart('LiveHours', {

    title: {
        text: 'HOURS SPEND ON THE LIVE PROJECT'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data:yu,
        showInLegend: true
    }]
});
}

}

$scope.hoursSpentOnMaintanceProject=function()
{
var mainhours=userprojectsService.getHourOnMaintaProject();
Highcharts.chart('maintanenceHours', {

    title: {
        text: 'HOURS SPEND ON THE MAINTANENCE PROJECT'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data:mainhours,
        showInLegend: true
    }]
});

}

$scope.noOfPeopleInTheLiveProject=function()
{
var noofEmployee=userprojectsService.getNoEmployeeInTheLiveProject();
console.log(noofEmployee);
Highcharts.chart('LivePeople', {

    title: {
        text: 'NO OF PEOPLE IN THE LIVE PROJECT'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data:noofEmployee,
        showInLegend: true
    }]
});

}

$scope.noOfPeopleInTheMaintanenceProject=function()
{
var maintaEmployee=userprojectsService.getNoEmployeeInTheMaintaProject();
console.log(maintaEmployee);
Highcharts.chart('MaintanencePeople', {

    title: {
        text: 'NO OF PEOPLE IN THE MAINTANENECE PROJECT'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data:maintaEmployee,
        showInLegend: true
    }]
});
}

$scope.LivePerProductCost=function()
{
var cost=userprojectsService.getCostPerLiveProject();

Highcharts.chart('LiveProductCost', {

    title: {
        text: 'LIVE PROJECT PRODUCT COST AGAINST HOUR'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data:cost,
        showInLegend: true
    }]
});
}

$scope.maintanencePerProductCost=function()
{

var maitanencecost=userprojectsService.getCostPerMaintanenceProject()
console.log(maitanencecost)
Highcharts.chart('ProductCost', {

    title: {
        text: 'MAINTANENCE PROJECT PRODUCT COST AGAINST HOUR'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selectZed', 'sliced'],
        data:maitanencecost,
        showInLegend: true
    }]
});
}

$scope.getProjectStatus=function()
{
userprojectsService.getyearlyProjectStatusActive().then(function(result)
{
var activeArray=result.data;
for(i=0;i<activeArray.length;i++)
{
if(activeArray[i].mth==1)
{
var firstMonthActive=[]
firstMonthActive.push(activeArray[i])
var firstActiveValue=firstMonthActive.length;
userprojectsService.firstMonthArrayvalue(firstActiveValue)
console.log(firstActiveValue);
}


if(activeArray[i].mth==2)
{
var secMonthActive=[]
secMonthActive.push(activeArray[i])
var secActiveValue=secMonthActive.length;
userprojectsService.firstMonthArrayvalue(secActiveValue);
console.log(secActiveValue);
}


if(activeArray[i].mth==3)
{
var thirMonthActive=[]
thirMonthActive.push(activeArray[i])
var thirActiveValue=thirMonthActive.length;
userprojectsService.firstMonthArrayvalue(thirActiveValue);

console.log(thirActiveValue);
}


if(activeArray[i].mth==4)
{
var fourMonthActive=[]
fourMonthActive.push(activeArray[i])
var fourActiveValue=fourMonthActive.length;
userprojectsService.firstMonthArrayvalue(fourActiveValue);

console.log(fourActiveValue);
}


if(activeArray[i].mth==5)
{
var fifthMonthActive=[]
fifthMonthActive.push(activeArray[i])
var fifthActiveValue=fifthMonthActive.length;
userprojectsService.firstMonthArrayvalue(fifthActiveValue);
console.log(fifthActiveValue);
}


if(activeArray[i].mth==6)
{
var sixMonthActive=[]
sixMonthActive.push(activeArray[i])
var sixActiveValue=sixMonthActive.length;
userprojectsService.firstMonthArrayvalue(sixActiveValue);

console.log(sixActiveValue);
}


if(activeArray[i].mth==7)
{
var sevenMonthActive=[]
sevenMonthActive.push(activeArray[i])
var sevenActiveValue=sevenMonthActive.length;
userprojectsService.firstMonthArrayvalue(sevenActiveValue);

console.log(sevenActiveValue);
}


if(activeArray[i].mth==8)
{
var eightMonthActive=[]
eightMonthActive.push(activeArray[i])
var eightActiveValue=eightMonthActive.length;
userprojectsService.firstMonthArrayvalue(eightActiveValue)

console.log(eightActiveValue);

}

if(activeArray[i].mth==9)
{
var nineMonthActive=[]
nineMonthActive.push(activeArray[i])
var nineActiveValue=nineMonthActive.length;
userprojectsService.firstMonthArrayvalue(nineActiveValue)

console.log(nineActiveValue);
}


if(activeArray[i].mth==10)
{
var tenMonthActive=[]
tenMonthActive.push(activeArray[i])
var tenActiveValue=tenMonthActive.length;
userprojectsService.firstMonthArrayvalue(tenActiveValue);

console.log(tenActiveValue);
}


if(activeArray[i].mth==11)
{
var elevenMonthActive=[]
elevenMonthActive.push(activeArray[i])
var elevenActiveValue=elevenMonthActive.length;
userprojectsService.firstMonthArrayvalue(elevenActiveValue);

console.log(elevenActiveValue);
}


if(activeArray[i].mth==12)
{
var twelthMonthActive=[]
twelthMonthActive.push(activeArray[i])
var twelthActiveValue=twelthMonthActive.length;
userprojectsService.firstMonthArrayvalue(twelthActiveValue);

console.log(twelthActiveValue);

}
$scope.projectStatus();

}




userprojectsService.getyearlyProjectStatusInactive().then(function(result){
console.log("inactive",result.data);
var InactiveArray=result.data;
for(i=0;i<InactiveArray.length;i++)
{
if(InactiveArray[i].mth==1)
{
var firstMonthInActive=[]
firstMonthInActive.push(InactiveArray[i])
var firstInActiveValue=firstMonthInActive.length;
console.log(firstInActiveValue);
userprojectsService.secMonthArrayvalue(firstInActiveValue);
}


if(InactiveArray[i].mth==2)
{
var secMonthInActive=[]
secMonthInActive.push(InactiveArray[i])
var secInActiveValue=secMonthInActive.length;
userprojectsService.secMonthArrayvalue(secInActiveValue);
console.log(secInActiveValue);
}


if(InactiveArray[i].mth==3)
{
var thirMonthInActive=[]
thirMonthInActive.push(InactiveArray[i])
var thirInActiveValue=thirMonthInActive.length;
userprojectsService.secMonthArrayvalue(thirInActiveValue);

console.log(thirInActiveValue);
}


if(InactiveArray[i].mth==4)
{
var fourMonthInActive=[]
fourMonthInActive.push(InactiveArray[i])
var fourInActiveValue=fourMonthInActive.length;
userprojectsService.secMonthArrayvalue(fourInActiveValue);

console.log(fourInActiveValue);
}


if(InactiveArray[i].mth==5)
{
var fifthMonthInActive=[]
fifthMonthInActive.push(InactiveArray[i])
var fifthInActiveValue=fifthMonthInActive.length;
userprojectsService.secMonthArrayvalue(fifthInActiveValue);

console.log(fifthInActiveValue);
}


if(InactiveArray[i].mth==6)
{
var sixMonthInActive=[]
sixMonthInActive.push(InactiveArray[i])
var sixInActiveValue=sixMonthInActive.length;
userprojectsService.secMonthArrayvalue(sixInActiveValue);

console.log(sixInActiveValue);
}


if(InactiveArray[i].mth==7)
{
var sevenMonthInActive=[]
sevenMonthInActive.push(InactiveArray[i])
var sevenInActiveValue=sevenMonthInActive.length;
userprojectsService.secMonthArrayvalue(sevenInActiveValue);

console.log(sevenInActiveValue);
}


if(InactiveArray[i].mth==8)
{
var eightMonthInActive=[]
eightMonthInActive.push(InactiveArray[i])
var eightInActiveValue=eightMonthInActive.length;
userprojectsService.secMonthArrayvalue(eightInActiveValue)

console.log(eightInActiveValue);

}

if(InactiveArray[i].mth==9)
{
var nineMonthInActive=[]
nineMonthInActive.push(InactiveArray[i])
var nineActiveInValue=nineMonthInActive.length;
userprojectsService.secMonthArrayvalue(nineActiveInValue);

console.log(nineInActiveValue);
}


if(InactiveArray[i].mth==10)
{
var tenMonthInActive=[]
tenMonthInActive.push(InactiveArray[i])
var tenInActiveValue=tenMonthInActive.length;
userprojectsService.secMonthArrayvalue(tenInActiveValue);

console.log(tenInActiveValue);
}


if(InactiveArray[i].mth==11)
{
var elevenMonthInActive=[]
elevenMonthInActive.push(InactiveArray[i])
var elevenInActiveValue=elevenMonthInActive.length;
userprojectsService.secMonthArrayvalue(elevenInActiveValue);

console.log(elevenInActiveValue);
}


if(InactiveArray[i].mth==12)
{
var twelthMonthInActive=[]
twelthMonthInActive.push(InactiveArray[i])
var twelthInActiveValue=twelthMonthInActive.length;
userprojectsService.secMonthArrayvalue(twelthInActiveValue);

console.log(twelthInActiveValue);

}
$scope.projectStatus();

}

userprojectsService.getyearlyProjectStatusProduction().then(function(result){
console.log("production",result.data);
var ProductionArray=result.data;
for(i=0;i<ProductionArray.length;i++)
{
if(ProductionArray[i].mth==1)
{
var firstMonthProduction=[]
firstMonthProduction.push(ProductionArray[i])
var firstProductionValue=firstMonthActive.length;
userprojectsService.thirdMonthArrayvalue(firstProductionValue)

console.log(firstProductionValue);
}


if(ProductionArray[i].mth==2)
{
var secMonthProduction=[]
secMonthProduction.push(ProductionArray[i])
var secProductionValue=secMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(secProductionValue);
console.log(secProductionValue);
}


if(ProductionArray[i].mth==3)
{
var thirMonthProduction=[]
thirMonthProduction.push(ProductionArray[i])
var thirProductionValue=thirMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(thirProductionValue);

console.log(thirProductionValue);
}


if(ProductionArray[i].mth==4)
{
var fourMonthProduction=[]
fourMonthProduction.push(ProductionArray[i])
var fourProductionValue=fourMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(fourProductionValue);

console.log(fourProductionValue);
}


if(ProductionArray[i].mth==5)
{
var fifthMonthProduction=[]
fifthMonthProduction.push(ProductionArray[i])
var fifthProductionValue=fifthMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(fifthProductionValue);

console.log(fifthProductionValue);
}


if(ProductionArray[i].mth==6)
{
var sixMonthProduction=[]
sixMonthProduction.push(ProductionArray[i])
var sixProductionValue=sixMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(sixProductionValue);

console.log(sixProductionValue);
}


if(ProductionArray[i].mth==7)
{
var sevenMonthProduction=[]
sevenMonthProduction.push(ProductionArray[i])
var sevenProductionValue=sevenMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(sevenProductionValue);

console.log(sevenProductionValue);
}


if(ProductionArray[i].mth==8)
{
var eightMonthProduction=[]
eightMonthProduction.push(activeArray[i])
var eightProductionValue=eightMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(eightProductionValue)

console.log(eightProductionValue);

}

if(ProductionArray[i].mth==9)
{
var nineMonthProduction=[]
nineMonthProduction.push(ProductionArray[i])
var nineProductionValue=nineMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(nineProductionValue);

console.log(nineProductionValue);
}


if(ProductionArray[i].mth==10)
{
var tenMonthProduction=[]
tenMonthProduction.push(ProductionArray[i])
var tenProductionValue=tenMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(tenProductionValue);

console.log(tenProductionValue);
}


if(ProductionArray[i].mth==11)
{
var elevenMonthProduction=[]
elevenMonthProduction.push(ProductionArray[i])
var elevenProductionValue=elevenMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(elevenProductionValue);

console.log(elevenProductionValue);
}


if(ProductionArray[i].mth==12)
{
var twelthMonthProduction=[]
twelthMonthProduction.push(ProductionArray[i])
var twelthProductionValue=twelthMonthProduction.length;
userprojectsService.thirdMonthArrayvalue(twelthProductionValue);

console.log(twelthProductionValue);

}
$scope.projectStatus();

}
userprojectsService.getyearlyProjectStatusMaintanence().then(function(result){
console.log("maintanence",result.data);
var MaintanenceArray=result.data;
for(i=0;i<MaintanenceArray.length;i++)
{
if(MaintanenceArray[i].mth==1)
{
var firstMonthMaintanence=[]
firstMonthMaintanence.push(MaintanenceArray[i])
var firstMaintanenceValue=firstMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(firstMaintanenceValue)

console.log(firstMaintanenceValue);
}


if(MaintanenceArray[i].mth==2)
{
var secMonthMaintanence=[]
secMonthMaintanence.push(MaintanenceArray[i])
var secMaintanenceValue=secMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(secMaintanenceValue);

console.log(secMaintanenceValue);
}


if(MaintanenceArray[i].mth==3)
{
var thirMonthMaintanence=[]
thirMonthMaintanence.push(MaintanenceArray[i])
var thirMaintanenceValue=thirMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(thirMaintanenceValue);

console.log(thirMaintanenceValue);
}


if(MaintanenceArray[i].mth==4)
{
var fourMonthMaintanence=[]
fourMonthMaintanence.push(MaintanenceArray[i])
var fourMaintanenceValue=fourMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(fourMaintanenceValue);

console.log(fourMaintanenceValue);
}


if(MaintanenceArray[i].mth==5)
{
var fifthMonthMaintanence=[]
fifthMonthMaintanence.push(MaintanenceArray[i])
var fifthMaintanenceValue=fifthMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(fifthMaintanenceValue);

console.log(fifthMaintanenceValue);
}


if(MaintanenceArray[i].mth==6)
{
var sixMonthMaintanence=[]
sixMonthMaintanence.push(MaintanenceArray[i])
var sixMaintanenceValue=sixMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(sixMaintanenceValue);

//console.log(sixActiveValue);
}


if(MaintanenceArray[i].mth==7)
{
var sevenMonthMaintanence=[]
sevenMonthMaintanence.push(MaintanenceArray[i])
var sevenMaintanenceValue=sevenMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(sevenMaintanenceValue);

console.log(sevenMaintanenceValue);
}


if(MaintanenceArray[i].mth==8)
{
var eightMonthMaintanence=[]
eightMonthMaintanence.push(MaintanenceArray[i])
var eightMaintanenceValue=eightMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(eightMaintanenceValue)

console.log(eightMaintanenceValue);

}

if(MaintanenceArray[i].mth==9)
{
var nineMonthMaintanence=[]
nineMonthMaintanence.push(MaintanenceArray[i])
var nineMaintanenceValue=nineMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(nineMaintanenceValue);

console.log(nineMaintanenceValue);
}


if(MaintanenceArray[i].mth==10)
{
var tenMonthMaintanence=[]
tenMonthMaintanence.push(MaintanenceArray[i])
var tenMaintanenceValue=tenMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(tenMaintanenceValue);

console.log(tenMaintanenceValue);
}


if(MaintanenceArray[i].mth==11)
{
var elevenMonthMaintanence=[]
elevenMonthMaintanence.push(MaintanenceArray[i])
var elevenMaintanenceValue=elevenMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(elevenMaintanenceValue);

console.log(elevenMaintanenceValue);
}


if(MaintanenceArray[i].mth==12)
{
var twelthMonthMaintanence=[]
twelthMonthMaintanence.push(MaintanenceArray[i])
var twelthMaintanenceValue=twelthMonthMaintanence.length;
userprojectsService.fourthMonthArrayvalue(twelthMaintanenceValue);

console.log(twelthMaintanenceValue);

}
$scope.projectStatus();

}
userprojectsService.getyearlyProjectStatusSlack().then(function(result){
console.log("slack",result.data);
var SlackArray=result.data;
for(i=0;i<SlackArray.length;i++)
{
if(SlackArray[i].mth==1)
{
var firstMonthSlack=[]
firstMonthSlack.push(SlackArray[i])
var firstSlackValue=firstMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(firstSlackValue)

console.log(firstSlackValue);
}


if(SlackArray[i].mth==2)
{
var secMonthSlack=[]
secMonthSlack.push(SlackArray[i])
var secSlackValue=secMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(secSlackValue);
console.log(secSlackValue);
}


if(SlackArray[i].mth==3)
{
var thirMonthSlack=[]
thirMonthSlack.push(SlackArray[i])
var thirSlackValue=thirMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(thirSlackValue);
console.log(thirSlackValue);
}


if(SlackArray[i].mth==4)
{
var fourMonthSlack=[]
fourMonthSlack.push(SlackArray[i])
var fourSlackValue=fourMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(fourSlackValue);
console.log(fourSlackValue);
}


if(SlackArray[i].mth==5)
{
var fifthMonthSlack=[]
fifthMonthSlack.push(SlackArray[i])
var fifthSlackValue=fifthMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(fifthSlackValue);
console.log(fifthSlackValue);
}


if(SlackArray[i].mth==6)
{
var sixMonthSlack=[]
sixMonthSlack.push(SlackArray[i])
var sixSlackValue=sixMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(sixSlackValue);
console.log(sixSlackValue);
}


if(SlackArray[i].mth==7)
{
var sevenMonthSlack=[]
sevenMonthSlack.push(SlackArray[i])
var sevenSlackValue=sevenMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(sevenSlackValue);
console.log(sevenSlackValue);
}


if(SlackArray[i].mth==8)
{
var eightMonthSlack=[]
eightMonthSlack.push(SlackArray[i])
var eightSlackValue=eightMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(eightSlackValue)
console.log(eightSlackValue);

}

if(SlackArray[i].mth==9)
{
var nineMonthSlack=[]
nineMonthSlack.push(SlackArray[i])
var nineSlackValue=nineMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(nineSlackValue)
console.log(nineSlackValue);
}


if(SlackArray[i].mth==10)
{
var tenMonthSlack=[]
tenMonthSlack.push(SlackArray[i])
var tenSlackValue=tenMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(tenSlackValue);
console.log(tenSlackValue);
}


if(SlackArray[i].mth==11)
{
var elevenMonthSlack=[]
elevenMonthSlack.push(SlackArray[i])
var elevenSlackValue=elevenMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(elevenSlackValue);
console.log(elevenSlackValue);
}


if(SlackArray[i].mth==12)
{
var twelthMonthSlack=[]
twelthMonthSlack.push(SlackArray[i])
var twelthSlackValue=twelthMonthSlack.length;
userprojectsService.fiveMonthArrayvalue(twelthSlackValue);
console.log(twelthSlackValue);

}

}
$scope.projectStatus();

})
})
})
})
})
}


$scope.getYearlyProjectStatus=function()
{
//var arrayofgraph=userprojectsService.totalArrayvalue();
//console.log(arrayofgraph);
var yyy=[]
 yyy=userprojectsService.getfirstMonthArrayvalue();
console.log(yyy);
}


$scope.hoursSpentOnLiveProjectdata=function()
{
var fullHoursData=[];
userprojectsService.getHoursSpendOnLiveProject().then(function(result){
console.log(result.data);
var liveProjectData=result.data;

for(var i=0;i<liveProjectData.length;i++)
{
var newArray=[];
console.log(liveProjectData[i].Projectstartdate);
var startDate=moment(liveProjectData[i].Projectstartdate);
var endDate=moment(new Date());
var d = endDate.diff(startDate, 'days');
console.log(d+1);
var HourSpend=(d+1)*8
liveProjectData[i].hoursspend=HourSpend
newArray.push(liveProjectData[i].Nameoftheproject);
newArray.push(liveProjectData[i].hoursspend);



fullHoursData.push(newArray);
}
userprojectsService.setHourOnLiveProject(fullHoursData);
$scope.hoursSpentOnLiveProject();


return fullHoursData;

})

}


$scope.hoursSpentOnMaintaProjectdata=function()
{
var fullHoursData=[];
userprojectsService.getHoursSpendOnMaintanenceProject().then(function(result){
console.log(result.data);
var MaintaProjectData=result.data;

for(var i=0;i<MaintaProjectData.length;i++)
{
var newArray=[];
console.log(MaintaProjectData[i].Projectstartdate);
var startDate=moment(MaintaProjectData[i].Projectstartdate);
var endDate=moment(new Date());
var d = endDate.diff(startDate, 'days');
console.log(d+1);
var HourSpend=(d+1)*8
MaintaProjectData[i].hoursspend=HourSpend
newArray.push(MaintaProjectData[i].Nameoftheproject);
newArray.push(MaintaProjectData[i].hoursspend);



fullHoursData.push(newArray);
}
userprojectsService.setHourOnMaintaProject(fullHoursData);
$scope.hoursSpentOnMaintanceProject();


return fullHoursData;

})

}

$scope.getNoOFPeopleIntheLiveProject=function()
{
var employeeTotal=[];
userprojectsService.getNoOfPeopleInTheLiveProject().then(function(result){
console.log(result.data)
var s=result.data;
console.log(s)
for(var i=0;i<s.length;i++)
{
var newObj=[]

newObj[0]=s[i].Nameoftheproject;

newObj[1]=s[i].Noofemployees;
console.log(newObj);
employeeTotal.push(newObj);

}
console.log(employeeTotal);
userprojectsService.setNoofEmployeeInTheLiveProject(employeeTotal);
$scope.noOfPeopleInTheLiveProject();
})
}


$scope.getNoOFPeopleIntheMaintaProject=function()
{
var employeeTotal=[];
userprojectsService.getNoOfPeopleInTheMaintanenceProject().then(function(result){
console.log(result.data)
var s=result.data;
console.log(s)
for(var i=0;i<s.length;i++)
{
var newObj=[]

newObj[0]=s[i].Nameoftheproject;

newObj[1]=s[i].Noofemployees;
console.log(newObj);
employeeTotal.push(newObj);

}
console.log(employeeTotal);
userprojectsService.setNoofEmployeeInTheMaintaProject(employeeTotal);
$scope.noOfPeopleInTheMaintanenceProject();
})
}

$scope.getCostOfLiveProject=function()
{
var fullcostData=[];
userprojectsService.getCostPerLiveProjectdata().then(function(result){
console.log(result.data)
var s=result.data;
console.log(s)

for(var i=0;i<s.length;i++)
{
var newArray=[];
console.log(s[i].Projectstartdate);
var startDate=moment(s[i].Projectstartdate);
var endDate=moment(new Date());
var d = endDate.diff(startDate, 'days');
console.log(d+1);
var HourSpend=(d+1)*8
var cost=s[i].CostPerHour;
s[i].totalcost=HourSpend*cost;
//liveProjectData[i].hoursspend=HourSpend
newArray.push(s[i].Nameoftheproject);
newArray.push(s[i].totalcost);



fullcostData.push(newArray);
}

console.log(fullcostData);
userprojectsService.setCostPerLiveProject(fullcostData);
$scope.LivePerProductCost();
})
}


$scope.getCostOfMaintanenceProject=function()
{
var fullcostData=[];
userprojectsService.getCostPerMaintanenceProjectdata().then(function(result){
console.log(result.data)
var s=result.data;
console.log(s)
for(var i=0;i<s.length;i++)
{
var newArray=[];
console.log(s[i].Projectstartdate);
var startDate=moment(s[i].Projectstartdate);
var endDate=moment(new Date());
var d = endDate.diff(startDate, 'days');
console.log(d+1);
var HourSpend=(d+1)*8
var cost=s[i].CostPerHour;
s[i].totalcost=HourSpend*cost;
//liveProjectData[i].hoursspend=HourSpend
newArray.push(s[i].Nameoftheproject);
newArray.push(s[i].totalcost);



fullcostData.push(newArray);
}

console.log(fullcostData);
userprojectsService.setCostPerMaintanenceProject(fullcostData);
$scope.maintanencePerProductCost();
})
}










function init()
{
$scope.getProjectStatus();
$scope.getYearlyProjectStatus();
$scope.hoursSpentOnLiveProjectdata();
$scope.hoursSpentOnMaintaProjectdata();
$scope.getNoOFPeopleIntheLiveProject();
$scope.getNoOFPeopleIntheMaintaProject();
$scope.getCostOfLiveProject();
$scope.getCostOfMaintanenceProject();

//$scope.hoursSpentOnMaintanceProject();();
//$scope.maintanencePerProductCost();
//$scope.projectStatus();



}

init();

})
