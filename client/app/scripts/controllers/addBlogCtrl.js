'use strict';

/**
 * @ngdoc function
 * @name demoapp.controller:addBlogCtrl
 * @description
 * # addBlogCtrl
 * Controller of demoapp
 */
app.controller('addBlogCtrl', function($scope,$rootScope, addBlogService, $state) {
  /* object to store all the form data
     scope of the object is private */
    $scope.form = {};

    /* object to show field value alert messages
       scope of the object is private */
    $scope.alerts = {};

    /* object for setting the selected tab class active
       scope of the object is global */
    $rootScope.page={
      "home":false,
      "blog":true
    };

    /*function to submit the form data to db with field validations
      scope of the function is private */
    $scope.submitForm = function() {
        $scope.alerts = {};
        if (!$scope.form.author) {
            $scope.alerts.author = "please enter an email address";
        } else if (!$scope.form.title) {
            $scope.alerts.title = "please enter an Title";
        } else if (!$scope.form.desc) {
            $scope.alerts.desc = "please enter an description";
        } else {
            var date = new Date();
            $scope.form.timestamp = date.getTime();
            addBlogService.postBlogData($scope.form).then(function(response) {
                if (response.status === 200 && response.data.isInserted) {
                    alert(response.data.message);
                    $state.transitionTo('home');
                } else {
                    alert("server error.Please try later");
                }
            });
        }
    };
});
