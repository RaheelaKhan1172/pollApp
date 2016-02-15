angular.module('app').controller('ExampleController',['$scope','Authentication',
   function($scope,Authentication) {
    $scope.name = Authentication.user ? ((Authentication.user.fullName === undefined) ? Authentication.user.username : 
                                          Authentication.user.username) : ''; 
  }
]);
