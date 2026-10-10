// Step 1: Set up function and margins
const drawVerticalBarChart = data => {
  const margin = { top: 50, right: 40, bottom: 40, left: 60 };
  const width = 800; // Tighter width to match the card
  const height = 450;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "none"); // Removed the black border

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Step 2: Set up Scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.4); // More padding for elegant, thinner bars

  const yScale = d3.scaleLinear()
    // Added + 50 to the max domain so the top labels don't get cut off!
    .domain([0, d3.max(data, d => d.Energy_Consumption) + 50])
    .range([innerHeight, 0]); 

  // Step 3: Draw Clean Axes & Background Gridlines
  const bottomAxis = d3.axisBottom(xScale).tickSize(0); // Remove bottom tick marks
  const leftAxis = d3.axisLeft(yScale).ticks(6).tickSize(-innerWidth); // Extend ticks into gridlines

  // Y-Axis Group (Gridlines)
  const yAxisGroup = innerChart.append("g").call(leftAxis);
  yAxisGroup.select(".domain").remove(); // Remove solid black vertical spine
  yAxisGroup.selectAll("line").attr("stroke", "#E8E1D3").attr("stroke-dasharray", "4 4"); // Dashed grid
  yAxisGroup.selectAll("text").attr("class", "axis-text").attr("dx", "-10");

  // X-Axis Group (Categories)
  const xAxisGroup = innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);
  xAxisGroup.select(".domain").attr("stroke", "#E8E1D3").attr("stroke-width", "2");
  xAxisGroup.selectAll("text").attr("class", "axis-text").attr("dy", "15").style("font-weight", "700");

  // Y-Axis Title
  innerChart.append("text")
    .text("Energy Consumption (kWh)")
    .attr("x", -margin.left + 10)
    .attr("y", -22)
    .attr("text-anchor", "start")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "13px")
    .style("font-weight", "700")
    .style("fill", "#6E5842");

  // Step 4: Draw Animated Bars
  innerChart
    .selectAll(".v-bar")
    .data(data)
    .join("rect")
    .attr("class", "v-bar-rect")
    .attr("width", xScale.bandwidth())
    .attr("rx", 6) // Rounded corners
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", innerHeight) // Animation Start: Bottom of the chart
    .attr("height", 0)      // Animation Start: 0 height
    .transition()           // Trigger animation!
    .duration(1000)
    .delay((d, i) => i * 150) // Staggered loading
    .attr("y", d => yScale(d.Energy_Consumption))
    .attr("height", d => innerHeight - yScale(d.Energy_Consumption));

  // Step 5: Add Animated Value Labels
  innerChart
    .selectAll(".v-bar-value")
    .data(data)
    .join("text")
    .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
    .attr("class", "bar-value") // Reuse our existing dark, bold text style
    .attr("x", d => xScale(d.Screen_Tech) + (xScale.bandwidth() / 2))
    .attr("y", d => yScale(d.Energy_Consumption) - 12) 
    .attr("text-anchor", "middle")
    .style("opacity", 0) // Animation Start: Invisible
    .transition()
    .duration(800)
    .delay((d, i) => (i * 150) + 600) // Appear just as the bar finishes growing
    .style("opacity", 1);
};

// Step 6: Load the data and call the function
d3.csv("data/data_exercise_5.1.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech.toUpperCase(),
    // Remember to use the KNIME column name here!
    Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"] 
  };
}).then(data => {
  // Sort data descending so the tallest bar is on the left
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
  
  drawVerticalBarChart(data);
});