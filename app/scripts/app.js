 (function() {
     function config($locationProvider, $stateProvider) {
         $locationProvider
             .html5Mode({
                 enabled: true,
                 requireBase: false
              });
 
         $stateProvider
             .state('home', {
                 url: '/',
                 controller: 'HomeCtrl as home',
                 templateUrl: '/templates/home.html'
             })
            .state('completed', {
                 url: '/completed',
                 controller: 'CompletedCtrl as completed',
                 templateUrl: '/templates/completed.html'
             });
     }
     
     angular
         .module('blocitoff', ['ui.router', 'firebase'])
         .config(config);
 })();