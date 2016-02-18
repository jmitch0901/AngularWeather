'use strict';


//MODULE
var weatherApp = angular.module('angularWeatherApp',['ngRoute','ngResource']);


//ROUTES
weatherApp.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'../views/home.html',
    controller:'homeController'
  })

  .when('/forecast',{
    templateUrl:'../views/forecast.html',
    controller:'forecastController'
  });
});

//SERVICES
weatherApp.service('cityService',function(){
  this.city = 'New York, NY';

});


//CONTROLLERS
weatherApp.controller('homeController',['$scope','cityService',
function($scope,cityService){
  $scope.city = cityService.city;
  //Watch when city changes in the view and save new results to singleton
  $scope.$watch('city',function(){
    cityService.city = $scope.city;
  });
}]);

weatherApp.controller('forecastController',['$scope','$resource','cityService',
function($scope,$resource,cityService){

    //BIND the singleton's data to the view
    $scope.city = cityService.city;

    //CONFIG the url and options for the api
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily',
    {
      callback:'JSON_CALLBACK'

    },
    {
      get:{
        method:'JSONP'
      }
    });

    //QUERY using GET to the api
    $scope.weatherResult = $scope.weatherAPI.get({
      APPID:'c119dd9ad408c1bd020b119cd9f50180',
      q: $scope.city,
      count:7
    });

    $scope.converToFarenheit = function(degK){
      return Math.round((1.8 * (degK - 271)) + 32);
    };

    $scope.convertDate = function(dt){
      return new Date(dt * 1000);
    };
}]);

// angular
//   .module('angularWeatherApp', [
//     'ngAnimate',
//     'ngCookies',
//     'ngResource',
//     'ngRoute',
//     'ngSanitize',
//     'ngTouch'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/main.html',
//         controller: 'MainCtrl',
//         controllerAs: 'main'
//       })
//       .when('/about', {
//         templateUrl: 'views/about.html',
//         controller: 'AboutCtrl',
//         controllerAs: 'about'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });
