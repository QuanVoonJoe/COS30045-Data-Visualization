# Exercise 3 – Data Story: TV Energy Consumption

## Overview
In this exercise, a data story was developed based on the Australian Equipment Energy Efficiency (E3) Program's TV Energy Consumption dataset (`tv_2026_02_15.csv`). Reusing the multi-page web platform created in Exercise 0.2, this site communicates empirical findings through data visualisations and narrative context.

---

## Data Story

### Audience
The target audience for this visualisation includes:
- **Consumers interested in energy-efficient televisions:** Prospective buyers seeking larger living room displays who want to understand long-term utility costs and avoid high electricity bills.
- **Policy makers and regulators interested in energy consumption trends:** Stakeholders monitoring compliance with Minimum Energy Performance Standards (MEPS) and the real-world distribution of energy consumption across display classes.
- **Researchers studying energy efficiency in consumer electronics:** Analysts evaluating technological transitions and power draws between standard LCDs, LED-backlit LCDs, and self-lit OLED panels.

### Story Overview
This visualisation explores patterns in TV energy consumption across different television models and specifications:
1. **Screen Size vs. Power Draw:** Explores how annual kilowatt-hour (kWh) demand scales from compact screens up to massive living room centerpieces.
2. **Screen Technology Impact:** Evaluates how different display panel technologies (LCD, LED, OLED) impact energy usage across small, medium, and large size categories.
3. **Consumer Purchasing Guidance:** Provides actionable rules of thumb for choosing efficient televisions to curb household electricity expenses and carbon emissions.

---

## About the Data

### Data Source
The dataset (`tv_2026_02_15.csv`) contains 4,724 registration records extracted from the Australian Government's GEMS product database administered by Energy Rating Australia. Attributes include brand (`Brand_Reg`), model identifiers, screen dimensions (`screensize` in cm), panel technology (`Screen_Tech`), star rating index (`Star2`), comparative energy consumption (`Labelled energy consumption (kWh/year)`), and active/passive standby power metrics.

### Data Processing
The dataset was processed using KNIME and Python:
- **Filtering Active Models:** Isolated actively sold products using `Availability Status == 'Available'`.
- **Unit Conversion:** Converted metric screen diagonal values from centimeters to inches (`screensize / 2.54`).
- **Cohort Grouping:** Aggregated models into standard consumer size cohorts (Small, Medium, Large) and display technologies (LCD, LCD (LED), OLED).
- **Financial Projections:** Applied the Australian national benchmark retail electricity tariff of **31.5¢ per kWh** to compute annual and 5-year running costs.

### Privacy
The dataset focuses exclusively on commercial product specifications and official energy testing results. It contains no personal or sensitive information regarding consumers or households.

### Accuracy and Limitations
- **Nominal Laboratory Testing:** Figures reflect standardized AS/NZS test cycles. Actual in-home energy consumption varies with peak HDR playback, ambient room sensor adjustments, soundbar connectivity, and active daily hours.
- **Self-Reported Registration:** Data relies on manufacturer filings audited by the GEMS regulator.

### Ethics
This project adheres to ethical data visualization practices:
- **Unbiased Representation:** Zero-baselines are enforced on all bar charts to prevent visual magnification of differences.
- **Transparent Context:** Data filters, baseline tariffs, and sample scopes are clearly labelled to ensure readers can draw informed, accurate conclusions.

---

## AI Declaration
Artificial Intelligence (Gemini) was used to assist with:
- Aggregating statistical averages across screen size classes and screen technologies.
- Structuring the HTML containers, semantic CSS classes, and drafting narrative explanatory copy.
- Formatting the README documentation in compliance with the unit specification.

All data calculations and visual representations were verified directly against `tv_2026_02_15.csv`.

---

## Website Storytelling
The website has been updated to communicate a data-driven story based on the TV energy consumption dataset:
- **Visualisations:** Clean grouped bar charts embedded directly within `televisions.html` showing screen size scaling and the energy consumption differences between screen technologies per size category.
- **Text Explanations:** Concrete narrative callouts contextualizing the massive power jump between small and large screens, and highlighting the "technology premium" where OLEDs draw significantly more power in small formats.
- **Contextual Integration:** Blends empirical data with the interactive energy calculator so users can test custom usage patterns immediately after reading the story.