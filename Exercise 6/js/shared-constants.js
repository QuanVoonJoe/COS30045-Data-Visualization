// Set up dimensions and margins
const margin = { top: 30, right: 30, bottom: 45, left: 60 };
const width = 800; 
const height = 450; // MATCHES histogram.js
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set some colors
const barColor = "#F49F1C";
const bodyBackgroundColor = "#FFFFFF";

// Set up the scales for histogram & scatterplot
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

const colorScale = d3.scaleOrdinal()
    .range(["#1F77B4", "#FF7F0E", "#2CA02C"]); // LED, LCD, OLED distinct colors

// Create a bin generator using d3.bin()
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

// Array of filter options for screen types
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Tooltip Dimensions for Exercise 6.4
const tooltipWidth = 60;
const tooltipHeight = 35;