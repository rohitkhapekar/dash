var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'Verizon';
});
app.directive('bars', function ($parse,$http) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart"></div>',
         link: function (scope, element, attrs) {
           var data = attrs.data.split(','),
           chart = d3.select('#chart')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
         
          
         } 
      };
   });