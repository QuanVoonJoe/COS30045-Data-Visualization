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

// Function to build the chart using the loaded data
const drawBarChart = data => {
  // Step 2 & 3: Define constants for layout
  const barHeight = 20;
  const barSpacing = 5;

  // Step 1: Bind data to SVG rect elements
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    
    // Assign a class for easier styling later
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.count}`;
    })
    
    // Step 2: Make data visible (width, height, fill)
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("fill", "blue")
    
    // Step 3: Space out the bars using the index (i)
    .attr("x", 0)
    .attr("y", (d, i) => i * (barHeight + barSpacing));
};