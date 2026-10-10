// js/donut-chart.js

const drawDonutChart = data => {
  const width = 800;
  const height = 450;
  const radius = Math.min(width, height) / 2 - 25;

  const svg = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "none");

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const totalCount = d3.sum(data, d => d.Count);

  const colorPalette = ["#D97706", "#F49F1C", "#F6DF8B", "#6E5842"];
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category))
    .range(colorPalette);

  const pie = d3.pie()
    .value(d => d.Count)
    .sort(null);

  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.50)
    .outerRadius(radius * 0.92)
    .padAngle(0.04)
    .cornerRadius(8);

  const textArc = d3.arc()
    .innerRadius(radius * 0.71)
    .outerRadius(radius * 0.71);

  // Center Metric (Total Models)
  innerChart.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.15em")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "26px")
    .style("font-weight", "900")
    .style("fill", "#2B2520")
    .text(totalCount.toLocaleString());

  innerChart.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1.3em")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "12px")
    .style("font-weight", "700")
    .style("fill", "#6E5842")
    .style("text-transform", "uppercase")
    .style("letter-spacing", "0.06em")
    .text("Total Models");

  const arcs = innerChart.selectAll(".arc")
    .data(pie(data))
    .join("g")
    .attr("class", "arc");

  const path = arcs.append("path")
    .attr("fill", d => color(d.data.Screensize_Category))
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 3.5)
    .style("cursor", "pointer")
    .style("transition", "filter 0.2s ease, opacity 0.2s ease");

  // Entrance animation
  path.transition()
    .duration(1000)
    .attrTween("d", function(d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function(t) {
        return arcGenerator(interpolate(t));
      };
    });

  // Stable, glitch-free hover using CSS filters and opacity instead of geometric resizing
  path.on("mouseenter", function(event, d) {
    d3.select(this)
      .style("filter", "brightness(1.08) drop-shadow(0 6px 12px rgba(0,0,0,0.18))");
  })
  .on("mouseleave", function(event, d) {
    d3.select(this)
      .style("filter", "none");
  });

  // Slice labels
  arcs.append("text")
    .text(d => {
      const percentage = ((d.data.Count / totalCount) * 100).toFixed(1);
      return `${d.data.Screensize_Category.toUpperCase()} (${percentage}%)`;
    })
    .attr("transform", d => `translate(${textArc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .style("font-family", "Inter, sans-serif")
    .style("font-size", "12.5px")
    .style("font-weight", "800")
    .style("fill", "#FFFFFF")
    .style("text-shadow", "0 1px 4px rgba(0, 0, 0, 0.6)")
    .style("pointer-events", "none")
    .style("opacity", 0)
    .transition()
    .duration(800)
    .delay(600)
    .style("opacity", 1);
};

d3.csv("data/Data_exercise_5.3.csv", d => {
  return {
    Screensize_Category: d.Screensize_Category,
    Count: +d.Count
  };
}).then(data => {
  drawDonutChart(data);
});