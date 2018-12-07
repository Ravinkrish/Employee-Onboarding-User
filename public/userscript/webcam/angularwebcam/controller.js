
  userapp.controller('webcamController', webcamController);
  webcamController.$inject = ['$scope', '$log','webcamservice'];
  function webcamController($scope,$log,webcamservice) {
    /* jshint validthis: true */

    $scope.cameraOnCondition=function()
    {
    console.log(" hai i am inside");
   $scope.$broadcast('webcamstart');
    }

    var vm = this;
    vm.config = {
      delay: 1,
      shots: 1,
      flashFallbackUrl: 'vendors/webcamjs/webcam.swf',
      shutterUrl: 'shutter.mp3',
      flashNotDetectedText: 'Seu browser não atende os requisitos mínimos para utilização da camera. ' +
      'Instale o ADOBE Flash player ou utilize os browsers (Google Chrome, Firefox ou Edge)'
    };

    vm.showButtons = false;
    vm.captureButtonEnable = false;
    vm.progress = 0;

    vm.onCaptureComplete = function(src) {
      $log.log('webcamController.onCaptureComplete : ', src);
      $scope.src=src;
      vm.progress = 100;
      var el = document.getElementById('result');
      var img = document.createElement('img');
      img.src = src[vm.config.shots-1];
      img.width = 240;
      img.height = 180;
      el.appendChild(img);
       console.log("sending images");
      webcamservice.setwebcameimages(src);
    };
    vm.onError = function(err) {
      $log.error('webcamController.onError : ', err);
      vm.showButtons = false;
    };
    vm.onLoad = function() {
      $log.info('webcamController.onLoad');
      vm.showButtons = true;
    };
    vm.onLive = function() {
      $log.info('webcamController.onLive');
      vm.captureButtonEnable = true;
    };
    vm.onCaptureProgress = function(src, progress) {
      vm.progress = progress;
      var result = {
        src: src,
        progress: progress
      }
      var el = document.getElementById('result');
      var img = document.createElement('img');
      img.src = src;
      img.width = 240;
      img.height = 180;
      el.appendChild(img);
      $log.info('webcamController.onCaptureProgress : ', result);
    };
    vm.capture = function() {
      $scope.$broadcast('ngWebcam_capture'); };
    vm.on = function() {
      $scope.$broadcast('ngWebcam_on');
    };
    vm.off = function() {

     $scope.$broadcast('ngWebcam_off');

      vm.captureButtonEnable = false;
    };

  }