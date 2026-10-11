// js/interactions.js

const populateFilters = data => {

    // 1. Add buttons to the user interface
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (event, d) => {
            console.log("Clicked filter data:", d);

            // 2. Update active button state
            if (!d.isActive) {
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id ? true : false;
                });

                d3.select("#filters_screen")
                    .selectAll(".filter")
                    .classed("active", filter => filter.id === d.id);

                // 3. Update the histogram with the selected filter
                updateHistogram(d.id, data);
            }
        });
};

// Function to update the histogram dynamically based on selected filter
const updateHistogram = (filterId, data) => {
    // Step 1: Filter data based on screen tech
    const updatedData = filterId === "all" 
        ? data 
        : data.filter(tv => tv.screenTech === filterId);

    // Step 2: Generate new bins for the filtered data
    const updatedBins = binGenerator(updatedData);

    // Step 3: Recalculate yScale domain and range
    const newMaxY = d3.max(updatedBins, d => d.length);
    yScale
        .domain([0, newMaxY * 1.08])
        .range([innerHeight, 0])
        .nice();

    const t = d3.transition().duration(500);

    // Step 4: Smoothly update the Y-Axis
    d3.select("#histogram svg g")
        .select(".y-axis-group")
        .transition(t)
        .call(d3.axisLeft(yScale).ticks(6).tickSize(0).tickPadding(10))
        .selectAll("text")
        .attr("class", "axis-text");

    // Step 5: Smoothly update the Gridlines
    d3.select("#histogram svg g")
        .select(".y-grid")
        .transition(t)
        .call(d3.axisLeft(yScale).ticks(6).tickSize(-innerWidth).tickFormat(""));

    // Step 6: Bind updated bins and transition bars
    const bars = d3.select("#histogram svg g")
        .selectAll(".hist-bar")
        .data(updatedBins, d => d.x0);

    // EXIT old bars
    bars.exit()
        .transition()
        .duration(300)
        .attr("y", innerHeight)
        .attr("height", 0)
        .remove();

    // UPDATE and ENTER bars
    bars.join(
        enter => enter.append("rect")
            .attr("class", "hist-bar")
            .attr("x", d => xScale(d.x0))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("y", innerHeight)
            .attr("height", 0)
            .attr("rx", 4)
            .attr("ry", 4)
            .call(enter => enter.transition().duration(500)
                .attr("y", d => yScale(d.length))
                .attr("height", d => innerHeight - yScale(d.length))
            ),
        update => update
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("x", d => xScale(d.x0))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length))
    );
};

// js/interactions.js

// 1. Create Tooltip function
const createTooltip = data => {
    // Append tooltip to scatterplot's innerChartS group
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Tooltip background rectangle
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Tooltip text label
    tooltip.append("text")
        .attr("class", "tooltip-text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "12px")
        .style("font-weight", "900");
};

// 2. Handle Mouse Events function
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // Update tooltip text with screen size
            d3.select(".tooltip-text")
                .text(d.screenSize);

            // Get circle coordinates
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // Position tooltip relative to the circle center and make visible
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // Hide tooltip and move it out of the way
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });
};