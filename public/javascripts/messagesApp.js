angular.module('messagesApp', []);

function MessagesController($scope, $http) {
  $scope.messages = [];
  $scope.message = '';
  $scope.refresh = function(){
    $http({method: 'GET', url: '/api/messages'}).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.messages = [];
        angular.forEach(data, function(value, key){
          this.push(value);
        }, $scope.messages);
        // this callback will be called asynchronously
        // when the response is available
      });
  };
  
  $scope.add = function(){
    // check the length of the message
    if ($scope.message != "")
    {
      $http.post('/api/messages', { text: $scope.message }).
      success(function(data, status, headers, config) {
        $scope.message = '';
        $scope.refresh();
      });
    }
  };
  
  $scope.refresh();
}
