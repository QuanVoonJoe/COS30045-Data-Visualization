const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .style("border", "none");

d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d["Count(SoldIn)"]
  };
}).then(data => {
  data.sort((a, b) => b.count - a.count);
  
  // Cut the data down to 10 to instantly reduce the vertical height
  const topData = data.slice(0, 10); 
  
  drawBarChart(topData);
});

const drawBarChart = data => {
  // Slightly taller overall canvas so the thinner bars have breathing room
  const chartHeight = data.length * 34; 
  svg.attr("viewBox", `0 0 850 ${chartHeight + 20}`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)]) 
    .range([0, 600]); 

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([10, chartHeight]) 
    .padding(0.35); // Increased padding makes the bars thinner and more elegant

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // 1. Draw Bars with Animation
  barAndLabel
    .append("rect")
    .attr("class", "bar-rect") 
    .attr("height", yScale.bandwidth())
    .attr("rx", 6) 
    .attr("x", 110)
    .attr("y", 0)
    .attr("width", 0) // Start width at 0 for animation
    .transition() // Animate the bars growing!
    .duration(1000) // 1 second total animation
    .delay((d, i) => i * 40) // Stagger the animation so they cascade down
    .attr("width", d => xScale(d.count));

  // 2. Add Brand Labels with Fade-in
  barAndLabel
    .append("text")
    .attr("class", "bar-label") 
    .text(d => d.brand)
    .attr("x", 95) // Pushed closer to the bar for a tighter layout
    .attr("y", yScale.bandwidth() / 2) 
    .attr("dy", "0.35em") 
    .attr("text-anchor", "end")
    .style("opacity", 0)
    .transition()
    .duration(800)
    .delay((d, i) => i * 40)
    .style("opacity", 1);

  // 3. Add Count Values with Delayed Fade-in
  barAndLabel
    .append("text")
    .attr("class", "bar-value") 
    .text(d => d.count)
    .attr("x", d => 110 + xScale(d.count) + 12) // Extra padding from the end of the bar
    .attr("y", yScale.bandwidth() / 2) 
    .attr("dy", "0.35em")
    .style("opacity", 0)
    .transition()
    .duration(800)
    .delay((d, i) => (i * 40) + 400) // Numbers appear right as the bars finish growing
    .style("opacity", 1);
};