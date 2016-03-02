angular.module('api').config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
       templateUrl:'api/views/list-api.client.view.html',
        controller:'ApiController'
    });
    
    $routeProvider.when('/user', {
        templateUrl: 'api/views/user-api.client.view.html',
        controller: 'ApiController'
    });
    
    $routeProvider.when('/polls', {
        templateUrl:'api/views/list-api.client.view.html',
        controller: 'ApiController'
    }).when('/polls/create', {
        templateUrl:'api/views/create-api.client.view.html',
        controller:'ApiController'
    }).when('/polls/:id',{
        templateUrl:'api/views/view-api.client.view.html',
        controller:'ApiController'
    }).when('/polls/:id/edit', {
        templateUrl:'api/views/edit-api.client.view.html',
        controller:'ApiController'
    }).otherwise({redirectTo:'/polls'});
}]);