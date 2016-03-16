angular.module('api').controller('ApiController',  ['$scope','$routeParams','Authentication','$location','Poll',
    function($scope,$routeParams,Authentication,$location,Poll) {
        $scope.authentication = Authentication;
        $scope.data = [];
        $scope.poll = {
          title: '',
          options: [{text:'',count:0},{text:'',count:0},{text:'',count:0}],
            votes: []
        };
        
        $scope.userChoice = $scope.poll.options;
        
        var colors =['#330099','#660099','#990099','#FF6633','#FFFF33','#66FF33','#0066FF','#9966CC','#FF6699'];
        
        var highlight = ["#336699","#666699","#996699", "#FF9966", "#FFFF99","#66FF99","#00CCFF","#9999CC","#FF9999"];
        
        
     $scope.chartOptions =  {

      segmentShowStroke : true,

      segmentStrokeColor : '#fff',

      segmentStrokeWidth : 1,

      percentageInnerCutout : 0, 

      animationSteps : 100,

      animationEasing : 'easeOutBounce',

      animateRotate : true,
         
      maintainAspectRatio: false,
         
      animateScale : false,
      legendTemplate:''
    };
        
        var updateGraph = function(data) {
            console.log('the data => ', data)
          if (data.options) {
          $scope.data = data.options.map(function(item,index) {
                  return {
                      "value":item.count,
                      "label":item.choice,
                      "color":colors[index % colors.length],
                      "highlight":highlight[index%highlight.length]
                  }
              });
          } else {
              for (var i = 0; i < data.length; i++) {
                  $scope.data.push(data[i].options.map(function(item,index) {
                    return {
                      "value":item.count,
                      "label":item.choice,
                      "color":colors[i % colors.length],
                      "highlight":highlight[i % highlight.length]
                  }
                  }));
              };
              console.log($scope.data);
          }
        };
        
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
          $scope.polls = Poll.query(function(data) {
            //  console.log('yo ho',data.length);
            for (var i = 0; i < data.length; i++) {
                console.log('hm lets see ',data[i].options, data[i].options[i]);
              $scope.data.push(data[i].options.map(function(a) {
                  console.log( 'value of a insinde map ', a)
                  return {
                      'value': a.count,
                      'label':a.choice,
                      'color':colors[i]
                  }
              }));
             
            }
         //     console.log('full results =>' ,$scope.data);
          });
          //  console.log('after the results = >', $scope.polls);
        };
        
        $scope.findOne = function() {
          $scope.poll = Poll.get({
            id: $routeParams.id
          },function(data) {
              var counts = 0;
              for (var i = 0; i<data.options.length;i++) {
                  if (data.options[i].count) {
                      counts+=1;
                  } 
                  if (counts) {
                      $scope.hasVotes = true;
                      updateGraph(data)
                  } else {
                     $scope.hasVotes = false;
                  }
              }
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
            $scope.hasVotes = true;
            $scope.poll.voteId = $scope.userChoice;
            $scope.poll.$update(function(data) {
                console.log('am i the data?',data,'the scope poll => ',$scope.poll);
                updateGraph(data);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                delete $scope.poll.voteId
            });
            console.log($scope.poll);
        };
        
        $scope.findUserPolls = function() {
            $scope.totalVotes = 0;
            console.log('before request is sent=>', $scope.authentication,$scope.authentication.user._id)
            $scope.poll = Poll.query(function(data) {
                $scope.userPoll = $scope.poll.filter(function(a,i) {
                    return a.creator == $scope.authentication.user._id;
                });
            for (var i = 0; i < $scope.userPoll.length; i++ ) {
                for (var m = 0;  m < $scope.userPoll[i].options.length; m++) {
                    if ($scope.userPoll[i].options[m].count) {
                        console.log('hello i shoud lahapen',$scope.userPoll[i].options[i].choice)
                        $scope.totalVotes += 1;
                    }
                }
            }
                updateGraph($scope.userPoll);
            });
            
        };
        $scope.timeOut = function() {
            $scope.hideIt = true;
            $timeout(function() {
                $scope.hidden = true;
            },3000);
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
