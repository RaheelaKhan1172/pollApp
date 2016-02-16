angular.module('polls').factory('Polls',['$resource', 
  function('$resource') {
    return $resource('/polls/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
}]);
  
