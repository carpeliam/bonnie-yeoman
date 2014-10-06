

// Various accessors that specify the four dimensions of data to visualize.
  function x(d) { return d.complexity; }
  function y(d) { return d.change; }
  function radius(d) { return d.complexity; }
  function color(d) { return d.change; }
  function name(d) {return d.name; }
  function ComplexListing(d) {return d.ComplexListing; }

  // Chart dimensions.
  var margin = {top: 79.5, right: 49.5, bottom: 39.5, left: 39.5},
    width = 1200 - margin.right,
    height = 500 - margin.top - margin.bottom;
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

  // Various scales. These domains make assumptions of data, naturally.
  var xScale = d3.scale.linear().domain([0, 50]).range([0, width]),
      yScale = d3.scale.linear().domain([-100, 100]).range([height, 0]),
      radiusScale = d3.scale.linear().domain([0, 50]).range([0, 50]),
      colorScale = d3.scale.quantile().domain([ 25, 50, 75]).range(["#0075C4","#3391D0","#eca9a7","#d9534f"]);

  // The x & y axes.
  var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
      yAxis = d3.svg.axis().scale(yScale).orient("left");

  // Create the SVG container and set the origin.
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the x-axis.
  svg.append("g")
      .attr("id", "xAxis")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);


  // Add the y-axis.
  svg.append("g")
      .attr("id", "yAxis")
      .attr("class", "y axis")
      .call(yAxis);

  // Add an x-axis label.
  svg.append("text")
      .attr("id", "xLabel")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 6)
      .text("complexity");

  // Add a y-axis label.
  svg.append("text")
    .attr("id", "yLabel")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("change in complexity");

  // Load the data.
  d3.json("cms.json", function(cms) {

  // Add a dot per measure and set the colors. 
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
     .data(cms)
    .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color(d)); })
      .call(position)
      .sort(order);

  var text = svg.selectAll("dot")
    .data(cms)
    .enter()
    .append("text");


  // Add CMS label
  var textLabels = text
    .attr("class", "cmsLabel")
    .attr("x", function(d) { return xScale(radius(d)) - 25; })
    .attr("y", function(d) { return yScale(y(d)) + (radius(d))+ 20; })
    .text(function name(d) {return d.name; })

   // Position the dots on the x/y axis  
  function position(dot) {
    dot.attr("cx", function(d) { return xScale(radius(d)); })
       .attr("cy", function(d) { return yScale(y(d)); })
       .attr("r", function(d) { return radiusScale(radius(d)); });
  }

   // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }
});
 // Defines interaction for pressing grid button
var button = d3.select("#grid");
  button.on("click", function() {
  d3.selectAll(".dot").transition()
    .attr("cx", function(d, i) { return i * 125 + 100; })
    .attr("cy", function(d, i) { return d.cy; })
  //label transistion
  d3.selectAll(".cmsLabel").transition()
    .attr("x", function(d, i) { return i * 125 + 75; })
    .attr("y", function(d, i) { return 75; })
  //Add the axis
  var active   = xAxis.active ? false : true ,
    newOpacity = active ? 0 : 1
  d3.selectAll(".axis").style("opacity", newOpacity);
  d3.select(".y .axis").style("opacity", newOpacity);
  d3.select("#xLabel").style("opacity", newOpacity);
  d3.select("#yLabel").style("opacity", newOpacity);
})
// Defines interaction for pressing graph button
var button = d3.select("#graph");
  button.on("click", function() {
  d3.selectAll(".dot").transition()
    .attr("cx", function(d) { return xScale(radius(d)); })
    .attr("cy", function(d) { return yScale(y(d)); })
  //Remove axis
  var active   = xAxis.active ? true : false,
    newOpacity = active ? 0 : 1
  d3.selectAll(".axis").style("opacity", newOpacity);
  d3.select(".y .axis").style("opacity", newOpacity);
  d3.select("#xLabel").style("opacity", newOpacity);
  d3.select("#yLabel").style("opacity", newOpacity);  
  //Move the labels back
  d3.selectAll(".cmsLabel").transition()
    .attr("x", function(d) { return xScale(radius(d)) - 25; })
    .attr("y", function(d) { return yScale(y(d)) + (radius(d))+ 20; })
})
function type(d) {
  d.name = +d.name;
  return d;
}