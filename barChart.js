/**
 * http://usejsdoc.org/
 */
function BarChart(config) {
  var margins = {
    top: 20,
    right: 10,
    bottom: 10,
    left: 25
  };
  var yAxis;
  var xScale, yScale;

  function chart(selection) {
    //createSVGCanvas(selection)
    selection.append("svg")
      .attr("width", config.width)
      .attr("height", config.height)
        .call(calculateScales)
        .call(drawAxisLayer)
        .call(dataLayer)

    return this;
  }

  function calculateScales(selection) {
    var data = selection[0][0].__data__;

    // Creates an array of integers from 0 to 35
    // Note : you can also step the increment check out more in the d3 docs 
    var xDomain = d3.range(0, data.length);
    var yDomain = [d3.max(data) + 1, d3.min(data) - 1];

    var xRange = [margins.left, config.width - margins.right];
    // Note that this scale is inverted
    // this is due to the fact that svg uses a scale that starts at zero from the top
    // and increases as you move down

    var yRange = [margins.top, config.height - margins.bottom];

    // Referencing rangeBands : 
    // Here you set the interval for the ordinal range as xrange
    // the inner padding between bars is 30% = .3 of the width of a bar 
    // the outter padding (padding on the outside of the outermost bars) is also 30% of the bar width.
    xScale = d3.scale.ordinal().domain(xDomain).rangeRoundBands(xRange, .3, .3);
    yScale = d3.scale.linear().domain(yDomain).range(yRange);

  }

  function drawAxisLayer(selection) {
    selection
      .append("g")
      .attr("id", "axis_grouping")
      .call(drawYAxis)
      .call(drawTextLayer);


  }

  function drawYAxis(selection) {
    yAxis = d3.svg.axis().scale(yScale).orient("left");

    selection
      .append("g").attr("id", "y_axis")
      .attr("transform", "translate(" + margins.left + "," + 0 + ")")
      .call(yAxis)
      .select("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("shape-rendering", "crispEdges");


  }

  function drawTextLayer(selection) {
    selection.append("g").attr("id", "text_layer")
      .selectAll("text").data(function(datum) {
        return datum
      }).enter().append("text")
      .attr("class", "bar-text")
      .attr("x", function(datum, index) {
        return xScale(index) + xScale.rangeBand() / 2;
      })
      .attr("y", function(datum) {
        return yScale(datum);
      })
      .text(function(datum) {
        return datum
      });


  }

  function dataLayer(selection) {
    var barGrouping = selection.append("g").attr("id", "data_layer");

    var bars = barGrouping.selectAll("rect")
      .data(function(datum) {
        return datum
      })
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("id", function(datum, index) {
        return "bar-" + index;
      })
    // Here we're grabbing a hold of the band width from the ordinal scale
    .attr("width", xScale.rangeBand())
      .attr("height", function(datum) {
        return yScale.range()[1] - yScale(datum);
      })
      .attr("x", function(datum, index) {
        return xScale(index);
      })
      .attr("y", function(datum) {
        return yScale(datum);
      })
      .on("mouseover",onHover);
      
    
    function onHover(datum)
    {
      // svg.append("line")
      //   .attr("x1",)
      //   .attr("x2",)
      //   .attr("y1",)
      //   .attr("y2",)
      alert(datum);
      
    }

  }

  return chart;
}