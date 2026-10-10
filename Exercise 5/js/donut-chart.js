// js/donut-chart.js

const drawDonutChart = data => {
  const width = 800;
  const height = 450;
  const radius = Math.min(width, height) / 2 - 40;

  // Create SVG container
  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "none");

  // Center the inner group element
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Create color scale using D3 scheme
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category))
    .range(d3.schemeTableau10); // Professional palette matching your dashboard

  // Calculate slice angles using d3.pie()
  const pie = d3.pie()
    .value(d => d.Count)
    .sort(null); // Keep original order from CSV

  // Set up Arc generator with inner radius for the donut hole
  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.55) // 55% inner hole
    .outerRadius(radius * 0.95)
    .padAngle(0.03)
    .cornerRadius(6);

  // Set up Arc generator for positioning text labels at the centroid
  const textArc = d3.arc()
    .innerRadius(radius * 0.75)
    .outerRadius(radius * 0.75);

  // Draw Arcs
  const arcs = innerChart.selectAll(".arc")
    .data(pie(data))
    .join("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("d", arcGenerator)
    .attr("fill", d => color(d.data.Screensize_Category))
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 2)
    .style("cursor", "pointer")
    .transition()
    .duration(1000)
    .attrTween("d", function(d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function(t) {
        return arcGenerator(interpolate(t));
      };
    });

  // Add category text labels at slice centroids
  arcs.append("text")
    .text(d => d.data.Screensize_Category)
    .attr("transform", d => `translate(${textArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .style("font-family", "Inter")
    .style("font-size", "13px")
    .style("font-weight", "700")
    .style("fill", "#FFFFFF")
    .style("opacity", 0)
    .transition()
    .duration(800)
    .delay(600)
    .style("opacity", 1);
};

// Load data and parse count as integer
d3.csv("data/Data_exercise_5.3.csv", d => {
  return {
    Screensize_Category: d.Screensize_Category,
    Count: +d.Count
  };
}).then(data => {
  drawDonutChart(data);
});