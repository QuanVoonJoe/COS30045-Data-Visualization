// js/histogram.js

const drawHistogram = data => {
    const width = 800;
    const height = 450;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "none");

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const bins = binGenerator(data);

    const minEng = bins[0].x0; 
    const maxEng = bins[bins.length - 1].x1; 
    const binsMaxLength = d3.max(bins, d => d.length);

    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength * 1.08])
        .range([innerHeight, 0])
        .nice();

    // Add Y-Axis Gridlines
    const leftAxisGrid = d3.axisLeft(yScale)
        .ticks(6)
        .tickSize(-innerWidth)
        .tickFormat("");

    innerChart.append("g")
        .attr("class", "y-grid")
        .call(leftAxisGrid);

    // Draw Histogram Bars
    const bars = innerChart.selectAll(".hist-bar")
        .data(bins)
        .join("rect")
        .attr("class", "hist-bar")
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("y", innerHeight)
        .attr("height", 0)
        .attr("rx", 4)
        .attr("ry", 4);

    // Entrance Animation
    bars.transition()
        .duration(1000)
        .delay((d, i) => i * 40)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));

    // Add X-Axis
    const bottomAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    const xAxisGroup = innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);
    
    xAxisGroup.select(".domain").attr("stroke", "var(--color-border)").attr("stroke-width", 2);
    xAxisGroup.selectAll("text").attr("class", "axis-text");

    // Add X-Axis Label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 42)
        .attr("text-anchor", "middle")
        .text("Labeled Energy Consumption (kWh/year)");

    // Add Y-Axis
    const leftAxis = d3.axisLeft(yScale).ticks(6).tickSize(0).tickPadding(10);
    const yAxisGroup = innerChart.append("g")
        .attr("class", "y-axis-group")
        .call(leftAxis);
    
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("text").attr("class", "axis-text");

    // Add Y-Axis Label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Frequency");
};