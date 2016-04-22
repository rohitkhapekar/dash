var app = angular.module('myapp', []);

app.directive('summary', function(){
  return {
    restrict: 'A',
    replace: false,
    scope: {
      summary: '='
    },
    templateUrl: 'summary.html',
    link: function(scope, elem, attrs){
      console.log('directive: call to load pie1');
      scope.summary();
    }
  }
});

/* Lodash Helper methods */

// group by with parent category
var dataGroupByParentCategory = function(data){
 return _.groupBy(data, function(entry){
    return entry.category.parent;
  });
};

// object with {parentCategory: sum(parentCategory.amount)}
var parentCategorySum = function(data) {

  var result = [];
  var dataGroupByParent = dataGroupByParentCategory(data);
  _.forEach(_.keys(dataGroupByParent), function(parentCategory){
     var s = _.reduce(dataGroupByParent[parentCategory], function(s, entry){
           return s + parseFloat(entry.amount);
     }, 0);
     result.push({'parent': parentCategory, 'amount': s})
  });

  return result;
};
/* end helper methods*/


app.controller('SummaryController', function($scope){
  console.log('controller glued');
  
  var summary = {
    'total_debit': '91.24',
    'days_left': 22,
    'month': 7,
    'total_credit': '0.0',
    'year': 2013,
    'data': [
        {
            'category': {
                'uri': '/categories/0b092e7c-4d2c-4eba-8c4e-80937c9e483d',
                'parent': 'Food',
                'name': 'Costco'
            },
            'amount': '55.0',
            'debit': true
        },
        {
            'category': {
                'uri': '/categories/d6c10cd2-e285-4829-ad8d-c1dc1fdeea2e',
                'parent': 'Food',
                'name': 'India Bazaar'
            },
            'amount': '40.0',
            'debit': true
        },
        {
            'category': {
                'uri': '/categories/d6c10cd2-e285-4829-ad8d-c1dc1fdeea2e',
                'parent': 'Food',
                'name': 'Sprouts'
            },
            'amount': '21.1',
            'debit': true
        },
        {
            'category': {
                'uri': '/categories/7ea09d55-9c47-4e28-9d4d-f2cead708385',
                'parent': 'Home',
                'name': 'Rent'
            },
            'amount': '655.14',
            'debit': true
        },
{
            'category': {
                'uri': '/categories/0b092e7c-4d2c-4eba-8c4e-80937c9e483d',
                'parent': 'Home',
                'name': 'Repair'
            },
            'amount': '15.0',
            'debit': true
        },
        {
            'category': {
                'uri': '/categories/d6c10cd2-e285-4829-ad8d-c1dc1fdeea2e',
                'parent': 'Travel',
                'name': 'Bart'
            },
            'amount': '200.0',
            'debit': true
        },
        {
            'category': {
                'uri': '/categories/d6c10cd2-e285-4829-ad8d-c1dc1fdeea2e',
                'parent': 'Travel',
                'name': 'Air Tickets'
            },
            'amount': '110.1',
            'debit': true
        },
        {
            'category': {
                'uri': '/categories/7ea09d55-9c47-4e28-9d4d-f2cead708385',
                'parent': 'Travel',
                'name': 'Disney'
            },
            'amount': '55.14',
            'debit': true
        }
    ]
};

  var drawPie = function(where, summaryData) {
    var width = 700,
    height = 300,
    radius = Math.min(width, height) / 2;
    
    /* If this is for Pie2, clean up its container */
    if (where === '#pie2') {
      d3.select(where).html('');
    }

    var color = d3.scale.category20b();

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 100);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.amount; });

    var svg = d3.select(where).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var g = svg.selectAll(".arc")
      .data(pie(summaryData))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { 
        console.log('d: ' + JSON.stringify(d, null, 4));
        return color(d.value); })
      .on('click', function(d){
        //alert('on path click - ' + d.data.parent);
        if (where === '#pie1') {
          $scope.visualizePie2(d.data.parent);  
        }
      });
      
    g.append("text")
      .attr("transform", function(d) { 
        return "translate(" + ( (radius - 12) * Math.sin( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) ) + "," + ( -1 * (radius - 12) * Math.cos( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) ) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", function(d) {
        var rads = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
        if ( (rads > 7 * Math.PI / 4 && rads < Math.PI / 4) || (rads > 3 * Math.PI / 4 && rads < 5 * Math.PI / 4) ) {
          return "middle";
        } else if (rads >= Math.PI / 4 && rads <= 3 * Math.PI / 4) {
          return "start";
        } else if (rads >= 5 * Math.PI / 4 && rads <= 7 * Math.PI / 4) {
          return "end";
        } else {
          return "middle";
        }
      })
      .text(function(d) { 
          if (where === '#pie1') {
            return d.data.parent + ': s' + d.value;   
          }
          
          if (where === '#pie2') {
            return d.data.category.name + ': $' + d.value;
          }
        });
      };
   
  var getPie1Data = function() {
    return parentCategorySum(summary.data);
  };
  
  $scope.visualizePie1 = function() {
    //console.log('controller: will load pie1');
    drawPie('#pie1', parentCategorySum(summary.data));
  };
  
  $scope.visualizePie2 = function(parentCategory) {
   // console.log('loading pie2 for ' + parentCategory);
    drawPie('#pie2', dataGroupByParentCategory(summary.data)[parentCategory]);
  }
});