# Exercise 6 – Interactive Visualisations

## Overview
In this exercise you will build **interactive data visualisations using D3.js**. Interaction allows users to explore the data and gain deeper insights through features such as filtering and tooltips.

Use the **same repository you forked earlier for this unit** and complete this exercise inside the **Exercise 6 folder**.

---

## Exercise 6.1 – Interactive Histogram: Filtering

### Aim
Build a histogram and add **interactive filters**.

### Purpose
Interaction is one of the key advantages of visualisations on the web. In this exercise you will build a **histogram using the TV dataset** and allow users to filter the data.

Users should be able to explore energy consumption for different TV screen technologies such as:

- LCD
- LED
- OLED

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Exercise 6.2 – Interactive Scatterplot: Tooltips

### Aim
Build a scatterplot and add **tooltips and colour coding**.

### Purpose
Tooltips are one of the most common interactive features in data visualisations. In this exercise you will create a **scatterplot using the TV dataset**.

The chart should allow users to explore the relationship between:

- Energy consumption
- Star rating
- Screen size
- Screen technology

Tooltips should display additional information such as **screen size**, and colours should represent **screen type**.

### Preparation
Before starting, review:

- This week's lecture slides
- **Chapter 7 of Dufour and Meeks (2024)**

---

## Instructions

1. Open your **existing forked repository**.
2. Navigate to the **Exercise 6 folder**.
3. Add the files needed to implement the histogram and scatterplot.
4. Implement the required interactive features using **D3.js**.
5. Commit and push your changes regularly to GitHub.

Your forked repository will serve as your **submission record**.


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