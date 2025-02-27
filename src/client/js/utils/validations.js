const { calculateRemainingDays } = require("./dateCalculations");

const cityErrors = document.querySelector("#city-error");
const startDateErrors = document.querySelector("#start-date-error");
const endDateErrors = document.querySelector("#end-date-error");

const validateInputs = (cityInput, startDateInput, endDateInput) => {
  //hide all errors
  cityErrors.style.display = "none";
  startDateErrors.style.display = "none";
  endDateErrors.style.display = "none";
  // validate city input
  if (!cityInput.value || cityInput.value.trim().length === 0) {
    cityErrors.innerHTML = "You need to enter a name of a city!";
    cityErrors.style.display = "block";
    return false;
  }
  // check if start date is selected
  if (!startDateInput.value) {
    startDateErrors.innerHTML = "You need to select a start date!";
    startDateErrors.style.display = "block";
    return false;
  }
  // validate start date
  if (calculateRemainingDays(startDateInput.value) < 0) {
    startDateErrors.innerHTML = "Date cannot be in the past!";
    startDateErrors.style.display = "block";
    return false;
  }
  // check if end date is selected
  if (!endDateInput.value) {
    endDateErrors.innerHTML = "You need to select an end date!";
    endDateErrors.style.display = "block";
    return false;
  }
  // validate end date
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  if (endDate < startDate) {
    endDateErrors.innerHTML = "End date cannot be before the start date!";
    endDateErrors.style.display = "block";
    return false;
  }
  return true;
};

module.exports = { validateInputs };
