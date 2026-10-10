// js/line-chart.js

const drawLineChart = data => {
  const margin = { top: 40, right: 40, bottom: 40, left: 60 };
  const width = 800;
  const height = 450;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "none");

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0]);

  // Axes & Gridlines
  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"))
    .tickSize(-innerHeight);

  const leftAxis = d3.axisLeft(yScale)
    .ticks(6)
    .tickSize(-innerWidth);

  // X-Axis Group
  const xAxisGroup = innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);
  
  xAxisGroup.select(".domain").attr("stroke", "#E8E1D3");
  xAxisGroup.selectAll("line").attr("stroke", "#E8E1D3").attr("stroke-dasharray", "4 4");
  xAxisGroup.selectAll("text").attr("class", "axis-text").attr("dy", "12");

  // Y-Axis Group
  const yAxisGroup = innerChart.append("g")
    .call(leftAxis);
  
  yAxisGroup.select(".domain").remove();
  yAxisGroup.selectAll("line").attr("stroke", "#E8E1D3").attr("stroke-dasharray", "4 4");
  yAxisGroup.selectAll("text").attr("class", "axis-text").attr("dx", "-10");

  // Y-Axis Title
  innerChart.append("text")
    .text("Average Price ($ per MWh)")
    .attr("x", -margin.left + 15)
    .attr("y", -15)
    .attr("text-anchor", "start")
    .style("font-family", "Inter")
    .style("font-size", "12px")
    .style("font-weight", "600")
    .style("fill", "#6E5842");

  // Draw Scatter Plot Points (Circles)
  innerChart.selectAll(".data-point")
    .data(data)
    .join("circle")
    .attr("class", "data-point")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice))
    .attr("r", 4)
    .attr("fill", "var(--color-darkamber)")
    .style("opacity", 0)
    .transition()
    .duration(800)
    .delay((d, i) => i * 40)
    .style("opacity", 1);

  // Line Generator with smooth curve
  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice))
    .curve(d3.curveMonotoneX);

  // Append Path Line
  innerChart.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "var(--color-amber)")
    .attr("stroke-width", 3)
    .attr("d", lineGenerator);
};

// Load data and parse accurately
d3.csv("data/ARE_Spot_Prices.csv", d => {
  return {
    year: +d.Year,
    averagePrice: +d["Average Price (notTas-Snowy)"]
  };
}).then(data => {
  drawLineChart(data);
});