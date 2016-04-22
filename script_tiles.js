var app = angular.module('myApp', []);

app.service('financialInformationService', function() {
    this.financialInfo = {
      'started': 'July 01, 2013',
      'today': 'July 21, 2013',
      'days': 31
    }  
});

app.directive('ngPtHeader', function() {

  return {
    restrict: 'E',
    templateUrl: 'financialInfo.html',
    replace: true,
    scope: {
      ngModel: '='
    },
    controller: ['$scope', 'financialInformationService', function($scope, financialInformationService){
      $scope.financialInfo = {};
      $scope.getFinancialMonthInformation = function() {
        $scope.financialInfo = financialInformationService.financialInfo;
      }
    }],
    link: function(scope, element, attributes) {
      scope.getFinancialMonthInformation();
    }
  }

});
