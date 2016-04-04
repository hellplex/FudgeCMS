'use strict';

// Declare app level module which depends on views, and inject components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.tinymce',
  'ngCookies',
  'message.flash'
])
/*  -- Orgiginal Config (using # in url) --- 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);*/
 
/*  Turn on the HTML5 mode in $locationProvider to make our site URLs are SEO friendly .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'View1Ctrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'View2Ctrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
  $locationProvider.html5Mode(true);
}]);*/


.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/admin/login', {
            templateUrl: 'partials/admin/login.html',
            controller: 'AdminLoginCtrl'
        });
        $routeProvider.when('/admin/pages', {
            templateUrl: 'partials/admin/pages.html',
            controller: 'AdminPagesCtrl'
        });
        $routeProvider.when('/admin/add-edit-page/:id', {
            templateUrl: 'partials/admin/add-edit-page.html',
            controller: 'AddEditPageCtrl'
        });

        $routeProvider.when('/:url', {
            templateUrl: 'partials/page.html',
            controller: 'PageCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/home'
        });

        $locationProvider.html5Mode(true);
    }
])

/* Interceptor */

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
});