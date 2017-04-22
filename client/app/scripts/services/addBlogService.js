app.factory('addBlogService', function($http, $q) {
    return {
      /*service to connect to backend db to post the form data  */
        postBlogData: function(blogData) {
            var requeststring = {
                method: 'POST',
                url: '/blog',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: blogData
            };
            var deferred = $q.defer();
            $http(requeststring).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(failureResponse) {
                deferred.resolve(failureResponse);

            });
            return deferred.promise;
        },
        /* Service to get all the blog data from the backend db */
        getBlogData: function() {
            var requeststring = {
                method: 'GET',
                url: '/blog',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            var deferred = $q.defer();
            $http(requeststring).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(failureResponse) {
                deferred.resolve(failureResponse);
            });
            return deferred.promise;
        }
    };
});
