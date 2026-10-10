// Set up the responsive SVG canvas (using a proportional viewBox)
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 600")
  .style("border", "1px solid black");

// Read the CSV data (keeping your exact KNIME header mapping)
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d["Count(SoldIn)"]
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  
  // Sort the data in descending order
  data.sort((a, b) => b.count - a.count);
  
  // Pass the formatted data to the chart drawing function
  drawBarChart(data);
});

// Function to build the chart using scales
const drawBarChart = data => {
  // Step 1: Linear scale for the x-axis (counts)
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 800]);

  // Step 2: Band scale for the y-axis (categories / brands)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 550])
    .padding(0.1);

  // Bind data and draw the scaled bars
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    // Use xScale so max counts fit nicely within the viewBox width
    .attr("width", d => xScale(d.count))
    // Use yScale bandwidth for clean, automatic bar thickness
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    // Use yScale mapped to each brand name for precise vertical stacking
    .attr("y", d => yScale(d.brand));
};