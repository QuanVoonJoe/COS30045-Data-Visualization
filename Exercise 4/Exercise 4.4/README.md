# Exercise 4.4
##Generative AI Acknowledgement
Tool Used: Google Gemini
Purpose: Code troubleshooting, D3.js scale implementation, and UI design integration.

Data Import & Parsing (Exercises 4.3 & 4.4):
    - Prompted the AI to troubleshoot an issue where D3.js was rendering invisible bars and returning NaN (Not a Number) errors in the browser console.
    - The AI identified a case-sensitivity mismatch between the JavaScript variables and the KNIME-generated CSV column headers.
    - Adopted the AI's provided solution to use JavaScript bracket notation (d["Count(SoldIn)"]) inside the d3.csv row conversion function to successfully map the complex KNIME headers to the D3 dataset.