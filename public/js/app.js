'use strict';

// Declare app level module which depends on views, and inject components
angular.module('myApp', [
  'ngCookies',
  'ngRoute',
  'myApp.version',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.tinymce',
  'message.flash'
])


/*  Example of components

angular.module('meanbaseApp', [
  // 'extensions',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngCropper',
  'angularFileUpload',
  'ngTouch',
  'extensions',
  'ng-sortable',
  'toastr',
  'relativeDate',
  'ngAnalytics'
])
*/

/*  -- Orgiginal Route to static page view1  (using # in url) --- 
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


      /*  Routes to Statics  */

        $routeProvider.when('/view1', {
          templateUrl: 'partials/static/view1.html',
          controller: 'View1Ctrl'
        });

        $routeProvider.when('/view2', {
          templateUrl: 'partials/static/view2.html',
          controller: 'View2Ctrl'
        });

        $routeProvider.when('/view3', {
          templateUrl: 'partials/static/view3.html',
          controller: 'View3Ctrl'
        });


      /*  Routes to Admin  */

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

      /*  Routes to Page List  */

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