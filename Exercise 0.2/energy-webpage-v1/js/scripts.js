document.addEventListener("DOMContentLoaded", () => {
  // Dynamic year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initAccordion();
  initCalculator();
});

/**
 * Requirement: Accordion FAQ (Hidden by default, smooth animated height)
 */
function initAccordion() {
  const toggles = document.querySelectorAll(".faq-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      // Close all accordion panels
      toggles.forEach((otherBtn) => {
        otherBtn.setAttribute("aria-expanded", "false");
        otherBtn.classList.remove("active");
        if (otherBtn.nextElementSibling) {
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      // Expand clicked panel if previously closed
      if (!isExpanded) {
        btn.setAttribute("aria-expanded", "true");
        btn.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/**
 * Requirement: Interactive Appliance Energy Calculator
 */
function initCalculator() {
  const form = document.getElementById("calculatorForm");
  if (!form) return;

  const presetSelect = document.getElementById("tvPreset");
  const powerInput = document.getElementById("powerWatts");
  const hoursInput = document.getElementById("hoursPerDay");
  const tariffInput = document.getElementById("electricityTariff");
  const resetBtn = document.getElementById("btnReset");

  const powerError = document.getElementById("powerError");
  const hoursError = document.getElementById("hoursError");
  const tariffError = document.getElementById("tariffError");

  // Preset autofill
  presetSelect.addEventListener("change", () => {
    const map = {
      "43led": 60,
      "55oled": 115,
      "65uhd": 150,
      "75qled": 210,
    };
    if (map[presetSelect.value]) {
      powerInput.value = map[presetSelect.value];
    }
    calculate();
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
  });

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      presetSelect.value = "43led";
      powerInput.value = 60;
      hoursInput.value = 4.5;
      tariffInput.value = 31.5;
      clearErrors();
      calculate();
    });
  }

  function calculate() {
    clearErrors();

    const watts = parseFloat(powerInput.value);
    const hours = parseFloat(hoursInput.value);
    const tariffCents = parseFloat(tariffInput.value);

    let isValid = true;

    if (isNaN(watts) || watts <= 0 || watts > 10000) {
      powerError.style.display = "block";
      isValid = false;
    }
    if (isNaN(hours) || hours <= 0 || hours > 24) {
      hoursError.style.display = "block";
      isValid = false;
    }
    if (isNaN(tariffCents) || tariffCents <= 0) {
      tariffError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // Mathematics
    const dailyKwh = (watts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const yearlyKwh = dailyKwh * 365;

    const tariffDollar = tariffCents / 100;
    const dailyCost = dailyKwh * tariffDollar;
    const monthlyCost = monthlyKwh * tariffDollar;
    const yearlyCost = yearlyKwh * tariffDollar;

    const co2Factor = 0.75; // kg CO2-e / kWh
    const dailyCo2 = dailyKwh * co2Factor;
    const monthlyCo2 = monthlyKwh * co2Factor;
    const yearlyCo2 = yearlyKwh * co2Factor;

    // DOM Updates
    document.getElementById("resultYearlyCost").textContent = `$${yearlyCost.toFixed(2)}`;
    document.getElementById("resultDailyCost").textContent = `approx. $${dailyCost.toFixed(2)} / day`;
    document.getElementById("resultYearlyKwh").textContent = yearlyKwh.toFixed(2);
    document.getElementById("resultDailyKwh").textContent = `Daily: ${dailyKwh.toFixed(2)} kWh`;

    document.getElementById("tableDailyKwh").textContent = `${dailyKwh.toFixed(2)} kWh`;
    document.getElementById("tableDailyCost").textContent = `$${dailyCost.toFixed(2)}`;
    document.getElementById("tableDailyCo2").textContent = `${dailyCo2.toFixed(2)} kg`;

    document.getElementById("tableMonthlyKwh").textContent = `${monthlyKwh.toFixed(2)} kWh`;
    document.getElementById("tableMonthlyCost").textContent = `$${monthlyCost.toFixed(2)}`;
    document.getElementById("tableMonthlyCo2").textContent = `${monthlyCo2.toFixed(2)} kg`;

    document.getElementById("tableYearlyKwh").textContent = `${yearlyKwh.toFixed(2)} kWh`;
    document.getElementById("tableYearlyCost").textContent = `$${yearlyCost.toFixed(2)}`;
    document.getElementById("tableYearlyCo2").textContent = `${yearlyCo2.toFixed(2)} kg`;
  }

  function clearErrors() {
    powerError.style.display = "none";
    hoursError.style.display = "none";
    tariffError.style.display = "none";
  }

  // Run initial calculation on load
  calculate();
}