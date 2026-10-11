# Exercise 5 – Multi-Chart Webpage

## Aim
Create a variety of different chart types using **D3.js**.

## Purpose
In previous exercises, we created simple charts such as a horizontal bar chart. In this exercise, you will extend your skills by building multiple chart types and presenting them on a webpage.

This activity focuses on using **D3 to visualise different types of data** and understanding when different charts are appropriate.

## Charts to Create

Using the provided **TV energy consumption dataset** (or your own dataset), your webpage must include the following chart types:

- **Scatter Plot**  
  Energy consumption vs star rating.

- **Donut Chart**  
  Energy consumption for different screen technologies across all TVs combined.

- **Bar Chart**  
  Energy consumption for different screen technologies for **55-inch TVs only**.

- **Line Chart**  
  Spot power prices from **1998 to 2024** (either plot the average or include a line for each state).

You may use the **provided datasets** or your **own dataset**, but your webpage must include **one example of each chart type**.

## Preparation

Before starting this exercise, it is recommended that you:

- Review this week's **lecture slides**
- Review **Chapter 4 and Chapter 5 of Dufour and Meeks (2024)**

## Instructions

Use the **forked repository that you created earlier for this unit**.

1. Open your existing **forked repository**.
2. Navigate to the **Exercise 5 folder**.
3. Add your code and files for this exercise inside that folder.
4. Build a webpage that displays the required charts using **D3.js**.
5. Commit and push your changes regularly to your GitHub repository.

## Submission

Your **forked repository** will serve as your submission.

Ensure that:
- All Exercise 5 files are inside the **Exercise 5 folder**
- Your code is pushed to GitHub
- Your repository link is submitted through the submission system.


# Appliance Energy Consumption — COS30045 Data Visualisation

Educational multi-page web application developed for **Swinburne University of Technology** (Unit: **COS30045 Data Visualization**), deployed and hosted on Swinburne's Mercury Apache server.

## Project Overview & Features

* **Home & Landing**: Executive introduction to Australian household appliance energy consumption, featuring key metrics, cost benchmarks, and responsive navigation.
* **Televisions & Calculator**: Interactive energy consumption and running cost calculator mapping household usage patterns against official appliance efficiency data.
* **Screen Analysis & SVG House**: Custom SVG graphics and data visualisations analyzing display technologies and structural appliance telemetry.
* **Energy Analytics (Exercises 6.1 – 6.4)**:
  * **Interactive Frequency Histogram (6.1 & 6.2)**: Analyzes annual energy draw across nearly 4,000 television models with real-time category filters (`All`, `LED`, `LCD`, `OLED`) and smooth D3 transition scales.
  * **Color-Coded Scatterplot (6.3)**: Plots Star Rating against Labeled Energy Consumption with horizontal jitter to prevent point overlap, custom color schemes, and integrated chart legends.
  * **Interactive Tooltips (6.4)**: Hover-activated floating tooltips displaying brand and screen size data with custom mouse event bindings (`mouseenter`/`mouseleave`) and opacity transitions.
* **About Us**: Project overview detailing unit learning objectives, author credentials, and official data references.

## Tech Stack

* **Frontend**: HTML5 (Semantic Structure), CSS3 (Modular Layouts & Custom Variables via `styles.css`)
* **Data Visualisation**: D3.js (v7) for dynamic SVG scaling, axes generation, binning, transitions, and DOM event handling.
* **Hosting**: Swinburne Mercury Apache Server (`http://http://mercury.swin.edu.au/cos30045/s106728379/exercise02/`)
* **Version Control**: Git & GitHub Repository (`QuanVoonJoe/COS30045-Data-Visualization`)

## Dataset

Equipment Energy Efficiency (E3) Program – **Energy Rating for Household Appliances (Televisions)**, sourced from Data.gov.au (January 2026 release).

## Generative AI Acknowledgement

Generative AI (Gemini) was utilized as an interactive programming collaborator throughout Exercises 5 and 6. Assistance included structuring D3.js data binding patterns, implementing continuous scale transformations and bin generators, debugging asynchronous CSV loading handlers, designing responsive grid layouts, and writing modular vanilla JavaScript event listeners for interactive tooltips and screen technology filters.

---
© 2026 Voon Joe Quan. All rights reserved. Built for COS30045 Data Visualisation.