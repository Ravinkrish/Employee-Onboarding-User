/**
 * Created by dhanalakshmi on 27-12-2016.
 */



var angularFromUI=angular.module('angularFromUI',[]);

angularFromUI.directive('jsonFrom', function() {
    return {
        scope: {
            jsonConfig:'='
        },
        /*link: link,*/
        templateUrl:'userscript/clientDirectives/template.html'
    };
});







