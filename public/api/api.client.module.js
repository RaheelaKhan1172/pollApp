angular.module('api',['ngResource']).factory('Poll', function($resource){
    return $resource('polls/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});
