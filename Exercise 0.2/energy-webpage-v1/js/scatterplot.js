// js/scatterplot.js

let innerChartS; // Declare globally so interactions.js can access it

const drawScatterplot = data => {
    const width = 800;
    const height = 450;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "none");

    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set up domains
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEnergy * 1.05])
        .range([innerHeight, 0])
        .nice();

    colorScale
        .domain(data.map(d => d.screenTech));

    // Y-Axis Gridlines
    const leftAxisGridS = d3.axisLeft(yScaleS)
        .ticks(6)
        .tickSize(-innerWidth)
        .tickFormat("");

    innerChartS.append("g")
        .attr("class", "y-grid")
        .call(leftAxisGridS);

    // Draw Scatter Circles
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 4.5)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5)
        .style("transition", "opacity 0.2s ease");

    // Add X-Axis
    const bottomAxisS = d3.axisBottom(xScaleS).ticks(9).tickSize(0).tickPadding(10);
    const xAxisGroupS = innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxisS);
    
    xAxisGroupS.select(".domain").attr("stroke", "var(--color-border)").attr("stroke-width", 2);
    xAxisGroupS.selectAll("text").attr("class", "axis-text");

    // Add X-Axis Label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 42)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    // Add Y-Axis
    const leftAxisS = d3.axisLeft(yScaleS).ticks(6).tickSize(0).tickPadding(10);
    const yAxisGroupS = innerChartS.append("g")
        .call(leftAxisS);
    
    yAxisGroupS.select(".domain").remove();
    yAxisGroupS.selectAll("text").attr("class", "axis-text");

    // Add Y-Axis Label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .text("Labeled Energy Consumption (kWh/year)");

    // Add Legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 5)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .style("font-family", "Inter, sans-serif")
            .style("font-size", "11.5px")
            .style("font-weight", "600")
            .style("fill", "var(--color-brown)")
            .text(screenTech);
    });

    // 3. Call Tooltip functions here
    createTooltip(data);
    handleMouseEvents();
};