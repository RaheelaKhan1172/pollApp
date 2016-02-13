angular.module('app').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'example/views/example.client.view.html'
    }).when('/signin', {
      templateUrl: 'example/views/signin.html'
    }).otherwise({ redirectTo: '/'});
  }
]);
