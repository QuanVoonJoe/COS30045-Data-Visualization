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

// Function to build the chart using scales and groups
const drawBarChart = data => {
  // Linear scale for the x-axis (counts)
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 800]);

  // Band scale for the y-axis (categories / brands)
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 550])
    .padding(0.1);

  // Step 2: Create a group container for bars and labels
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    // Transform moves the entire group down to the correct y-position
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Step 3: Add back the rectangles (now inside the group)
  barAndLabel
    .append("rect")
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    // Step 1: Shift bars 100px to the right to make room for text
    .attr("x", 100)
    // y is 0 because the group's transform already handles vertical position
    .attr("y", 0);

  // Step 4: Add the column category text (brand names)
  barAndLabel
    .append("text")
    .text(d => d.brand)
    // Position just left of the bars (90px)
    .attr("x", 90) 
    // Roughly center text vertically based on bar height
    .attr("y", 15) 
    // Right-align the text so it sits flush against the bars
    .attr("text-anchor", "end") 
    .style("font-size", "13px");

  // Step 5: Add the value number at the end of the bar
  barAndLabel
    .append("text")
    .text(d => d.count)
    // Position right after the bar: 100 (start) + bar width + 4 (padding gap)
    .attr("x", d => 100 + xScale(d.count) + 4)
    .attr("y", 15) 
    .style("font-size", "13px");
};