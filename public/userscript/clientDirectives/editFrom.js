/**
 * Created by dhanalakshmi on 27-12-2016.
 */



var angularEditFromUI=angular.module('angularEditFromUI',[]);

angularEditFromUI.directive('editFrom',function(){
return {

        scope: {
            jsonConfig:'='
        },
  templateUrl:'userscript/clientDirectives/editJsonTemplate.html',

    };
});






