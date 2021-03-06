'use strict';

angular.module('myApp.services', [])

/* Factory to communicate with the backend web services, that will do the CRUD operations. */

.factory('pagesFactory', ['$http', function($http) {

    return {
      getPages: function() {
        return $http.get('/api/pages');
      },

      /* Method to add a new page or edit the contents of an existing page. 
      Check for the "id" value in our post data. If the "id" value is set to 0, 
      then add new record, otherwise, update the record for that "id". */
      savePage: function(pageData) {
        var id = pageData._id;

        if (id == 0) {
          return $http.post('/api/pages/add', pageData);
        } else {
          return $http.post('/api/pages/update', pageData);
        }
      },
      deletePage: function(id) {
        return $http.get('/api/pages/delete/' + id);
      },
      getAdminPageContent: function(id) {
        return $http.get('/api/pages/admin-details/' + id);
      },
      getPageContent: function(url) {
        return $http.get('/api/pages/details/' + url);
      },
    };
  }
])

/* Authentication Factory */

.factory('AuthService', ['$http', function($http) {
  return {
    login: function(credentials) {
      return $http.post('/api/login', credentials);
    },
    logout: function() {
      return $http.get('/api/logout');
    }
  };
}])


/* Interceptor to detect responses, for session timeout */

.factory('myHttpInterceptor', ['$q', '$location', function($q, $location) {
    return {
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/admin/login');
                return $q.reject(response);
            }
            return $q.reject(response);
        }
    };
}]);