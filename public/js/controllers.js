'use strict';

/* Main App Controllers */

angular.module('myApp.controllers', [])


/* Admin section controller */

.controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
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


/* Login controller  */

.controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 'AuthService', 'flashMessageService',
  function($scope, $location, $cookies, AuthService, flashMessageService) {
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

          /* Call our message dispatcher if error happens and also send to the console */
          flashMessageService.setMessage(err.data);

          console.log(err);

      });
    };
  }
])


/*  Add & Edit Controller

Necessary dependencies: Besides $scope and $log, we need to inject $routeparams to get the route parameters, the $location module to redirect, flashMessageService to set notifications, pagesFactory service, filter for url.

*/

.controller('AddEditPageCtrl', ['$scope', '$log', 'pagesFactory', '$routeParams', '$location', 'flashMessageService','$filter',
    function($scope, $log, pagesFactory, $routeParams, $location, flashMessageService,$filter) {

        $scope.pageContent = {};
        $scope.pageContent._id = $routeParams.id;
        $scope.heading = "Add a New Page";

        /*  Check if page ID being passed is 0, to ADD or the MongoDB-generated ID to EDIT */
        if ($scope.pageContent._id !== 0) {
          $scope.heading = "Update Page";
          pagesFactory.getAdminPageContent($scope.pageContent._id).then(
              function(response) {
                $scope.pageContent = response.data;
                $log.info($scope.pageContent);
              },
              function(err) {
                $log.error(err);
              });
        }

        /* SavePage function, to save contents from the form by posting it to the savePage factory function. When the promise returns with success, redirect the user to listing page. */

        $scope.savePage = function() {
          pagesFactory.savePage($scope.pageContent).then(
            function() {
              flashMessageService.setMessage("Page Saved Successfully");
              $location.path('/admin/pages');
            },
            function() {
              $log.error('error saving data');
            }
          );
        };

        /* Update URL function, store the value into the pageContent.url property by using the formatURL filter and passing $scope.pageContent.title as an argument to it. */
        
        $scope.updateURL=function(){
          $scope.pageContent.url=$filter('formatURL')($scope.pageContent.title);
        }
    }
])
