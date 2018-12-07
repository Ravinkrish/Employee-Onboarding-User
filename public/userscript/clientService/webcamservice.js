userapp.factory("webcamservice", function ($http) {
 var photoss=[];
 var setwebcameimages=function(photos)
 {
for(var i=0;i<photos.length;i++)
{
photoss=photos[i];
//console.log(photoss)
}
//console.log(photoss)
//return $http.post('/imageslist',photoss);
 }
 var getimages=function()
 {
 return photoss;
 }
return{
     setwebcameimages:setwebcameimages,
     getimages:getimages
  }


})