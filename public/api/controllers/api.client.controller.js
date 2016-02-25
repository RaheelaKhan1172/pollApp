angular.module('api').controller('ApiController',  ['$scope','$routeParams','Authentication','$location','Poll',
    function($scope,$routeParams,Authentication,$location,Poll) {
        $scope.authentication = Authentication;
        
        $scope.poll = {
          title: '',
          options: [{text:''},{text:''},{text:''}]
        };
        //also used for updating
        $scope.addMoreOptions = function() {
          $scope.poll.options.push({text:''});  
        };
        
        $scope.createPoll = function() {
            var poll = $scope.poll;
            poll = new Poll(poll);
            console.log('in api', poll,this);
            poll.$save(function(response) {
                console.log('the response',response,poll);
                $location.path('polls/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.find = function() {
          $scope.polls = Poll.query();
        };
        
        $scope.findOne = function() {
            
          $scope.poll = Poll.get({
              id: $routeParams.id
          });
            console.log($scope.poll,$scope.authentication,'id',$scope.poll.creator, 'user id','in findOne');
        };
        
        $scope.update = function() {
            console.log($scope.poll,'the poll')
            $scope.poll.$update(function() {
              $location.path('polls/' + $scope.poll._id);  
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.delete = function(poll) {
            if(poll) {
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