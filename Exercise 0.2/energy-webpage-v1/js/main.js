// Selects the main heading and changes its color
d3.select("h1")
  .style("color", "green");

// Appends a new paragraph with specific text to our target container
d3.select("#d3-container")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");
  
// Appends a rectangle to the SVG canvas and assigns position, size, and color attributes so it is visible
d3.select("#d3-svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");