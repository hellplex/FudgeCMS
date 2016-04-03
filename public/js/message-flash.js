'use strict';

/* Module to manage system messages */

angular.module('message.flash', []).

factory('flashMessageService', ['$rootScope',function($rootScope) {
  var message = '';
  return {
    getMessage: function() {
      return message;
    },
    setMessage: function(newMessage) {
      message = newMessage;

      /* In order to passing messages between controllers/directives we need to use either rootScope 
      or set up $watch or $digest to ensure that the scope objects update when the source has changed.
      $broadcast, dispatches an event name to all child scopes. 
      Child scopes use this as a trigger to execute different functions.

      In our case, as we don't really have a parent-child relation between 
      the directive and our controllers, we will set up a broadcast on rootScope itself */
      $rootScope.$broadcast('NEW_MESSAGE')
      /* Now, every time the setMessage function is called, we will broadcast the event called 'NEW_MESSAGE'. */
    }
  };
}])

/* Chain our directive to the module */
.directive('messageFlash', [function() {
  return {
    controller: function($scope, flashMessageService, $timeout) {

      /* We first listen for the broadcast event, and on its trigger, 
      we populate $scope.message by calling the getMessage function of flashMessageService.
      Then timeout function that will automatically hide the message in 2500 milliseconds, for usability reasons. */
      $scope.$on('NEW_MESSAGE', function() {
        $scope.message = flashMessageService.getMessage();
        $scope.isVisible = true;
        return $timeout(function() {
          $scope.isVisible = false;
          return $scope.message = '';
        }, 2500);
      })
    },
    /*
    Template code that uses the ng-if directive to toggle the display. 
    Using Bootstrap's alert CSS classes for cosmetic reasons. */
    template: '<p ng-if="isVisible" class="alert alert-info">{{message}}</p>'
    }
  }
]);
