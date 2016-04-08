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
  'message.flash',
  "xeditable" 
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

        $routeProvider.when('/home', {
          templateUrl: 'partials/static/home.html',
          controller: 'HomeCtrl'
        });

        $routeProvider.when('/dashboard', {
          templateUrl: 'partials/static/dashboard.html',
          controller: 'DashboardCtrl'
        });


        $routeProvider.when('/charts', {
          templateUrl: 'partials/static/charts.html',
          controller: 'ChartsCtrl'
        });

        $routeProvider.when('/tables', {
          templateUrl: 'partials/static/tables.html',
          controller: 'TablesCtrl'
        });

        $routeProvider.when('/forms', {
          templateUrl: 'partials/static/forms.html',
          controller: 'FormsCtrl'
        });

        $routeProvider.when('/bootstrap-elements', {
          templateUrl: 'partials/static/bootstrap-elements.html',
          controller: 'bootstrapElCtrl'
        });

        $routeProvider.when('/bootstrap-grid', {
          templateUrl: 'partials/static/bootstrap-grid.html',
          controller: 'bootstrapGrCtrl'
        });



      /*  Routes to Admin  */

        $routeProvider.when('/admin/login', {
            templateUrl: 'partials/admin/login.html',
            controller: 'AdminLoginCtrl'
        });
        $routeProvider.when('/admin/settings', {
            templateUrl: 'partials/admin/settings.html',
            controller: 'SettingsCtrl'
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
})


/* Inline editing */
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});