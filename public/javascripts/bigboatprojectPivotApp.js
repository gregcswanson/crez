angular.module('bbpApp', []);

function PivotController($scope, $http) {
  $scope.data = [];
  $scope.pivotOptions = [{id: "category", name: "Category"},{id: "year", name: "Year"}];
  $scope.pivotOption = $scope.pivotOptions[0]; //{id: "category", name: "Category"};
  $scope.pivot = '';
  $scope.pivotValues = [];
  
  $scope.refresh = function(){
    $http({method: 'GET', url: '/bigboatproject/data'}).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.data = [];
        
        angular.forEach(data, function(value, key){
          this.push(value);
        }, $scope.data);
        
        $scope.loadPivotValues();
      });
  };
  
  $scope.loadPivotValues = function(){
      $scope.pivotValues = [];
      angular.forEach($scope.data, function(value, key){
          var newValue = {name: value[$scope.pivotOption.id] };
          if (_.findWhere(this, newValue) == null) {
            this.push(newValue);
          }
        }, $scope.pivotValues);
        $scope.pivotValues = _.sortBy($scope.pivotValues, "name");
  };
  
  $scope.$watch('pivotOption', function () {
        $scope.loadPivotValues();
    });
  
  $scope.refresh();
}
