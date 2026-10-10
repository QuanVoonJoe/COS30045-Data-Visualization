// Step 1: Set up function and margins
const drawVerticalBarChart = data => {
  // The D3 margin convention
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Add the svg container
  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);
    // .style("border", "1px solid black"); // Optional: uncomment to see outer bounds

  // Create inner chart group and apply margins
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Step 2: Set up Scales
  // Band scale for categorical x-axis (Screen Tech)
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

  // Linear scale for numerical y-axis (Energy Consumption)
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0]); // Note: Range is upside-down! 0 is at the bottom

  // Step 3: Add Axis
  const bottomAxis = d3.axisBottom(xScale);
  const leftAxis = d3.axisLeft(yScale);

  // Draw X-Axis at the bottom
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // Draw Y-Axis on the left
  innerChart
    .append("g")
    .call(leftAxis);

  // Add Y-Axis label
  innerChart
    .append("text")
    .text("Energy Consumption (kWh)")
    .attr("x", -margin.left)
    .attr("y", -10)
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .style("font-weight", "600");

  // Step 4: Add the bars
  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("width", xScale.bandwidth())
    // Subtract the y-coordinate from the total inner height to get the bar height
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("fill", "green"); // Required color per the exercise

  // Step 5: Customization Challenge - Add text values above the bars
  innerChart
    .selectAll(".bar-value")
    .data(data)
    .join("text")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
    .attr("x", d => xScale(d.Screen_Tech) + (xScale.bandwidth() / 2))
    .attr("y", d => yScale(d.Energy_Consumption) - 8) // Push slightly above the bar
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "600");
};

// Step 6: Load the data and call the function
d3.csv("data/data_exercise_5.1.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech.toUpperCase(),
    
    // Use bracket notation to match KNIME's exact, messy output!
    Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"] 
  };
}).then(data => {
  // Sort data descending so the tallest bar is on the left
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
  
  drawVerticalBarChart(data);
});