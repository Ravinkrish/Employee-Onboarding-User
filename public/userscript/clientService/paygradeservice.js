/**
 * Created by Pro on 8/9/2017.
 */
userapp.factory("payGradeService", function ($http) {
    var formConfigObj={};
    var payGradeCount;

    var getpayGradeJsonConfig = function(){
        return $http.get('/payGradeJsonConfig');
    }
    var setpayGradeFromConfig=function(formConfig){
        formConfigObj=formConfig

    }
    var getpayGradeFromConfig=function(){
    console.log(formConfigObj)
        return formConfigObj
    }

    var savepayGradeDetails = function(payGradeData){
    console.log("savepaygrade");
   console.log(payGradeData);
        return $http.post('/payGradeDetails',payGradeData);
    }
    var getpayGradeDetailsByRange=function(start,range){
        return $http.get('/payGradeDetails/'+start+'/'+range);
    }
    var getpayGradeDetailsCount = function(){
        return $http.get('/payGradeDetails/count');
    }
    var getpayGradeCount = function(){
        return payGradeCount;
    }
    var setpayGradeCount = function(val){
        payGradeCount=val;
    }
    var updatepayGradeDetails = function(companyDetails){
        return $http.post('/payGradeDetails/update',companyDetails)
    }
    var deletepayGradeDetails = function(id){
        return $http.delete('/payGradeDetails/'+id);
    }
    var getpayGradeDetailsById = function(id){
        return $http.get('/payGradeDetails/'+id);
    }

    var getpayGradeDetailsByName = function(clientName){
    console.log("clientName");
        return $http.post('/payGradeDetails/name',clientName);
    }

    var getAllpayGradeName = function(){
        return $http.get('/payGradeDetailsName');
    }




    return{
        getpayGradeJsonConfig:getpayGradeJsonConfig,
        setpayGradeFromConfig:setpayGradeFromConfig,
        getpayGradeFromConfig:getpayGradeFromConfig,
        savepayGradeDetails:savepayGradeDetails,
        getpayGradeDetailsByRange:getpayGradeDetailsByRange,
        getpayGradeDetailsCount:getpayGradeDetailsCount,
        getpayGradeCount:getpayGradeCount,
        setpayGradeCount:setpayGradeCount,
        updatepayGradeDetails:updatepayGradeDetails,
        deletepayGradeDetails:deletepayGradeDetails,
        getpayGradeDetailsById:getpayGradeDetailsById,
        getpayGradeDetailsByName:getpayGradeDetailsByName,
        getAllpayGradeName:getAllpayGradeName
    }






})
