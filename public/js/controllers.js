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
]);