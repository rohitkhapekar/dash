var app = angular.module('plunker', ['nvd3']);

app.controller('MainCtrl', function($scope) {
  $scope.options = {
            chart: {
                type: 'lineChart',
                height: 300,
                weidth: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Number of Features'
                },
                yAxis: {
                    axisLabel: 'Accuracy',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },
           
           
        };

        $scope.data = sinAndCos();

        /*Random Data Generator */
        function sinAndCos() {
            var sin = [],sin2 = [],
                cos = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: [{x: 78, y: 75}, {x: 76, y: 77}, {x: 75, y: 76}, {x: 73, y: 75}, {x: 72, y: 75}, {x: 71, y: 77}, {x: 60, y: 76}, {x:58, y: 73}, {x: 56, y: 74}, {x: 54, y: 77}, {}],      //values - represents the array of {x,y} data points
                    key: 'Feature One', 
                    color: 'red'  
                }
            ];
        };
        
});