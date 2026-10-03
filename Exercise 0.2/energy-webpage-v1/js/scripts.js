document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initCalculator();
});

/**
 * Requirement: FAQ Accordion Behaviour (Hidden by default, toggled via JS)
 */
function initAccordion() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";
      const content = header.nextElementSibling;

      // Close all accordion panels
      headers.forEach((h) => {
        h.setAttribute("aria-expanded", "false");
        h.classList.remove("active");
        if (h.nextElementSibling) {
          h.nextElementSibling.style.display = "none";
        }
      });

      // If clicked item was not open, open it
      if (!isExpanded) {
        header.setAttribute("aria-expanded", "true");
        header.classList.add("active");
        content.style.display = "block";
      }
    });
  });
}

/**
 * Requirement: Interactive Appliance Energy Calculator (Challenge)
 * Inputs: Watts, Hours/day, Electricity cents per kWh
 * Computes: Daily kWh, Monthly kWh, Monthly cost ($AUD), Yearly cost ($AUD)
 */
function initCalculator() {
  const form = document.getElementById("calculatorForm");
  if (!form) return;

  const powerInput = document.getElementById("appliancePower");
  const hoursInput = document.getElementById("hoursPerDay");
  const tariffInput = document.getElementById("electricityTariff");

  const powerError = document.getElementById("powerError");
  const hoursError = document.getElementById("hoursError");
  const tariffError = document.getElementById("tariffError");

  const dailyKwhDisplay = document.getElementById("dailyKwh");
  const monthlyKwhDisplay = document.getElementById("monthlyKwh");
  const monthlyCostDisplay = document.getElementById("monthlyCost");
  const yearlyCostDisplay = document.getElementById("yearlyCost");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset validation states
    clearErrors([powerInput, hoursInput, tariffInput], [powerError, hoursError, tariffError]);

    const watts = parseFloat(powerInput.value);
    const hours = parseFloat(hoursInput.value);
    const centsPerKwh = parseFloat(tariffInput.value);

    let isValid = true;

    // Validate Watts
    if (isNaN(watts) || watts <= 0) {
      showError(powerInput, powerError, "Enter a valid wattage (> 0W).");
      isValid = false;
    }

    // Validate Daily Hours
    if (isNaN(hours) || hours <= 0 || hours > 24) {
      showError(hoursInput, hoursError, "Enter hours between 0.1 and 24.");
      isValid = false;
    }

    // Validate Electricity Tariff
    if (isNaN(centsPerKwh) || centsPerKwh <= 0) {
      showError(tariffInput, tariffError, "Enter a valid tariff rate (> 0¢).");
      isValid = false;
    }

    if (!isValid) return;

    // Calculations
    const dailyKwh = (watts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30.42; // Avg month length
    const costPerKwh = centsPerKwh / 100;
    const monthlyCost = monthlyKwh * costPerKwh;
    const yearlyCost = dailyKwh * 365 * costPerKwh;

    // Update DOM dynamically
    dailyKwhDisplay.textContent = `${dailyKwh.toFixed(2)} kWh`;
    monthlyKwhDisplay.textContent = `${monthlyKwh.toFixed(2)} kWh`;
    monthlyCostDisplay.textContent = `$${monthlyCost.toFixed(2)} AUD`;
    yearlyCostDisplay.textContent = `$${yearlyCost.toFixed(2)} AUD`;
  });

  function showError(inputElement, errorElement, message) {
    inputElement.classList.add("input-error");
    errorElement.textContent = message;
  }

  function clearErrors(inputs, errorElements) {
    inputs.forEach((input) => input.classList.remove("input-error"));
    errorElements.forEach((el) => (el.textContent = ""));
  }
}