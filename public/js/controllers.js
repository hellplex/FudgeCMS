'use strict';
angular.module('myApp.controllers', []).

/* Controller for the admin section */
controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
  function($scope, $log, pagesFactory) {

  	/*  
  	Make a request to the getPages method of pagesFactory 
  	and populate the allPages scope object using the promise. */
    pagesFactory.getPages().then(
      function(response) {
        $scope.allPages = response.data;
      },
      function(err) {
        $log.error(err);
      });

    /* Define method to delete a page; accepts "id" as an input parameter. */
      $scope.deletePage = function(id) {
        pagesFactory.deletePage(id);
      };

    }
])

/* Controller for login */
.controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 'AuthService','$log',
    function($scope, $location, $cookies, AuthService, $log) {
      $scope.credentials = {
        username: '',
        password: ''
      };
      $scope.login = function(credentials) {
        AuthService.login(credentials).then(
          function(res, err) {
            $cookies.loggedInUser = res.data;
            $location.path('/admin/pages');
          },
          function(err) {
            $log.log(err);
          });
        };
    }
]);