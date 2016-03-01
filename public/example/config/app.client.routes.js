angular.module('app').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'api/views/list-api.client.view.html',
        controller:'ApiController'
    }).when('/signin', {
      templateUrl: 'example/views/signin.html'
    }).otherwise({ redirectTo: '/'});
  }
]);
