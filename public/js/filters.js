'use strict';

/* Filters */

/*  Ensure that alias generated is stripped out of any special characters or spaces, replaced by a dash */

angular.module('myApp.filters', [])
  .filter('formatURL', [

    function() {
      return function(input) {
        var url = input.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        var url = url.replace(/[\s+]/g, '-');
        return url.toLowerCase();

      };
    }
    
]);