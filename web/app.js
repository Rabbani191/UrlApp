var app = angular.module ('urlApp',['ui.bootstrap', 'ngclipboard']);

app.controller('mainController',function($scope,$http,$sce,$window){
  $scope.show =false;
  $scope.submit = 'SHORTEN URL';
  $scope.loading = false ;
  $scope.shortUrl = function (){
    $scope.loading =true;
    $http({  method : "POST",url : "/checkReboot",data: {'OrUrl':$scope.OriginalUrl,recaptcha: document.getElementById("g-recaptcha-response").value}})
     .then(function(response){
         console.log("response",response);
         if (response.data.responseCode ==0){
           $http({  method : "POST",url : "/getUrl",data: {'OrUrl':$scope.OriginalUrl}})
            .then(function(response){
              $http({  method : "GET",url : "/getUrlData"})
               .then(function(data){
                 console.log(response.data.shortUrl);
                 $scope.urlData = data.data;
                 $scope.show =true;
                 $scope.iFrameUrl = $sce.trustAsResourceUrl(response.data.shortUrl);
                 $scope.link= $sce.trustAsResourceUrl($scope.iFrameUrl +'.info');
                 $scope.loading =false;
                 grecaptcha.reset();
               },function(err){console.log (err);});
             }, function(error){console.log(error);});
          }
         else{
           grecaptcha.reset();
           $scope.cancel();
            $window.alert('check the box');
            }
      }, function(error){$scope.loading =false;console.log(error);});
    }
  $scope.cancel =function (){

     //  $window.open($scope.link, '_blank');
     $scope.loading =false;
     $scope.show = false ;
     $scope.OriginalUrl =null;
     $scope.iFrameUrl=null;
     $scope.link = null;

    }
  $scope.openShortWindow = function (x){
    $window.open(x.short + '.info', '_blank');
  }

 $scope.openLongWindow = function(x){
   $window.open(x.orginal, '_blank');
 }

});
