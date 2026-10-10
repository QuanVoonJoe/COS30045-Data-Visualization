// Set up the responsive SVG canvas
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

// Read the CSV data
d3.csv("data/tvBrandCount.csv", d => {
  // Row conversion function: ensures counts are treated as numbers
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  // Check the data in the browser console
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  
  // Sort the data in descending order
  data.sort((a, b) => b.count - a.count);
  
  // Pass the formatted data to the chart drawing function (to be built next)
  drawBarChart(data);
});