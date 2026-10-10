// js/brand-chart.js
const brandSvg = d3.select("#brand-bar-chart")
  .append("svg")
  .style("border", "none");

d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d["Count(SoldIn)"]
  };
}).then(data => {
  data.sort((a, b) => b.count - a.count);
  const topData = data.slice(0, 10);
  drawBrandBarChart(topData);
});

const drawBrandBarChart = data => {
  // Use the margin convention so we have room for axes and labels
  const margin = { top: 20, right: 60, bottom: 40, left: 110 };
  const width = 850;
  const chartHeight = data.length * 36;
  const height = chartHeight + margin.top + margin.bottom;
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  brandSvg.attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = brandSvg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)]) 
    .range([0, innerWidth]); 

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, innerHeight]) 
    .padding(0.35);

  // Add subtle background gridlines for the x-axis
  const xAxisGrid = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(-innerHeight)
    .tickFormat("");

  innerChart.append("g")
    .attr("class", "x-grid")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxisGrid)
    .selectAll("line")
    .attr("stroke", "#E8E1D3")
    .attr("stroke-dasharray", "4 4");

  // Add the X-Axis at the bottom
  const bottomAxis = d3.axisBottom(xScale).ticks(5);
  const xAxisGroup = innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);
  
  xAxisGroup.select(".domain").attr("stroke", "#E8E1D3");
  xAxisGroup.selectAll("text").attr("class", "axis-text").attr("dy", "10");

  // Add a clean Y-Axis line for the brand names
  const leftAxis = d3.axisLeft(yScale).tickSize(0);
  const yAxisGroup = innerChart.append("g")
    .call(leftAxis);
  
  yAxisGroup.select(".domain").attr("stroke", "#E8E1D3");
  yAxisGroup.selectAll("text")
    .attr("class", "bar-label")
    .attr("dx", "-10")
    .style("text-anchor", "end");

  // Create bar and label groups
  const barAndLabel = innerChart
    .selectAll(".brand-group")
    .data(data)
    .join("g")
    .attr("class", "brand-group")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Draw Bars with Animation
  barAndLabel
    .append("rect")
    .attr("class", "bar-rect") 
    .attr("height", yScale.bandwidth())
    .attr("rx", 6) 
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 0)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 40)
    .attr("width", d => xScale(d.count));

  // Add Count Values with Fade-in
  barAndLabel
    .append("text")
    .attr("class", "bar-value") 
    .text(d => d.count)
    .attr("x", d => xScale(d.count) + 10) 
    .attr("y", yScale.bandwidth() / 2) 
    .attr("dy", "0.35em")
    .style("opacity", 0)
    .transition()
    .duration(800)
    .delay((d, i) => (i * 40) + 400)
    .style("opacity", 1);
};