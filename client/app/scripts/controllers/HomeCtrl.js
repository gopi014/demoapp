'use strict';

/**
 * @ngdoc function
 * @name demoapp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of demoapp
 */
app.controller('HomeCtrl', function($scope, $state,$rootScope, addBlogService) {
  /* array for getting all the blog entries
     scope of the array is private */
    $scope.blogData = [];

    /* object for setting the selected tab class active
       scope of the object is global */
    $rootScope.page={
      "home":true,
      "blog":false
    };
    /*function to get the blogdata from the backend database
       scope of the function is private */
    $scope.getAllBlogData = function() {
        addBlogService.getBlogData().then(function(response) {
            if (response.status === 200) {
                $scope.blogData = response.data;
                /*underscore command to sort the data by the timestamp of the data created in desc order
                  scope of the variable is private */
                $scope.blogData = _.sortBy($scope.blogData, function(o) {
                    return o.timestamp;
                }).reverse();
            } else {
                alert("Server error.Please try later");
            }
        });
    };
    $scope.getAllBlogData();
});
