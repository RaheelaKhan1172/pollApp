angular.module('api').controller('ApiController',  ['$scope','$routeParams','Authentication','$location','Poll',
    function($scope,$routeParams,Authentication,$location,Poll) {
        $scope.authentication = Authentication;
        
        

        
        $scope.poll = {
          title: '',
          options: [{text:'',count:0},{text:'',count:0},{text:'',count:0}],
            votes: []
        };
        
        $scope.userChoice = $scope.poll.options;
        
        //also used for updating
        $scope.addMoreOptions = function() {
          $scope.poll.options.push({text:'',count:0});  
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
            console.log('the scope polls ', $scope.polls);
          $scope.polls = Poll.query();
            console.log('after the results = >', $scope.polls);
        };
        
        $scope.findOne = function() {
            
          $scope.poll = Poll.get({
              id: $routeParams.id
          });
            console.log($scope.poll,$scope.authentication,'id',$scope.poll.creator, 'user id','in findOne');
        };
        
        $scope.update = function() {
            console.log($scope.poll,'the poll');
            $scope.poll.$update(function() {
              $location.path('polls/' + $scope.poll._id);  
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        
        $scope.updateVote = function() {
            $scope.poll.voteId = $scope.userChoice;
            $scope.poll.$update(function(data) {
                console.log('am i the data?',data,'the scope poll => ',$scope.poll);
                $location.path('polls/' + data._id);
            }, function(errorResponse,data) {
                $scope.error = errorResponse.data.message;
                delete $scope.poll.voteId
            });
            console.log($scope.poll);
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