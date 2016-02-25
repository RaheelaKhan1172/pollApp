angular.module('api').config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/polls/create', {
        templateUrl:'api/views/create-api.client.view.html',
        controller:'ApiController'
    }).when('/polls/:id',{
        templateUrl:'api/views/view-api.client.view.html',
        controller:'ApiController'
    }).when('/polls/:id/edit', {
        templateUrl:'api/views/edit-api.client.view.html',
        controller:'ApiController'
    }).otherwise({redirectTo:'/'});
}]);