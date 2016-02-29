angular.module('api').controller('ApiController',  ['$scope','$routeParams','Authentication','$location','Poll',
    function($scope,$routeParams,Authentication,$location,Poll) {
        $scope.authentication = Authentication;

        $scope.poll = {
          title: '',
          options: [{text:'',count:0},{text:'',count:0},{text:'',count:0}],
            votes: []
        };
        
        $scope.userChoice = $scope.poll.options;
        
        var colors =['#330099','#660099','#990099','#FF6633','#FFFF33','#66FF33','#0066FF','#9966CC','#FF6699'];
        
        var highlight = ["#336699","#666699","#996699", "#FF9966", "#FFFF99","#66FF99","#00CCFF","#9999CC","#FF9999"];
        
     $scope.chartOptions =  {

      responsive: true,

      segmentShowStroke : true,

      segmentStrokeColor : '#fff',

      segmentStrokeWidth : 1,

      percentageInnerCutout : 0, 

      animationSteps : 100,

      animationEasing : 'easeOutBounce',

      animateRotate : true,
         
      maintainAspectRatio: false,
         
      animateScale : false,
    };
        
        //also used for updating
        $scope.addMoreOptions = function() {
          $scope.poll.options.push({text:'',count:0});  
        };
        var updateGraph = function(data) {
          $scope.data = data.options.map(function(item,index) {
                  return {
                      "value":item.count,
                      "label":item.choice,
                      "color":colors[index % colors.length],
                      "highlight":highlight[index%highlight.length]
                  }
                  console.log($scope.data, '<= data!');
              });
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
          },function(data) {
              console.log('ay just a test',data, data.options);
              updateGraph(data);
          });
            
            console.log($scope.poll,$scope.authentication,'id',$scope.poll.creator, 'user id','in findOne','options => ');
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
                updateGraph(data);
            }, function(errorResponse,data) {
                $scope.error = errorResponse.data.message;
                delete $scope.poll.voteId
            });
            console.log($scope.poll);
        };
        
        //fix update for poll for this one
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