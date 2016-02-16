angular.module('polls').controller('PollsController',['$scope','$routeParams','$location','Authentication','Polls',
  function($scope,$routeParams,$location,Authentication,Polls) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var poll = new Polls({
        title: this.title,
        options.option: this.option
      });

      poll.$save(function(response) {
        $location.path('polls/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.find = function() {
      $scope.polls = Polls.query();
    };
    
    $scope.findOne = function() {
      $scope.poll = Polls.get({
        id: $routeParams.id
      });
    };
    
    $scope.update = function() {
      $scope.poll.$update(function() {
        $location.path('polls/' + $scope.poll._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  
    $scope.delete = function(poll) {
      if (poll) {
        poll.$remove(function() {
          for (var i in $scope.polls) {
            if ($scope.polls[i] === poll) {
              $scope.polls.splice(i,1);
            }
          }
        });
      } else {
        $scope.poll.$remove(function() {
          $location.path('polls');
        });
      }
    };

  }
]);


  
