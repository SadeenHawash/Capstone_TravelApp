// Get UI elements
const resultsContainer = document.querySelector("#results"); // Ensure this exists in HTML

const updateUI = (location, weather, remainingDays, picture, tripLength) => {
  // update the remaining days
  document.querySelector(
    "#rDays"
  ).innerHTML = `Your trip starts in ${remainingDays} days from now!!`;
  // Create a new city card
  const cityCard = document.createElement("div");
  cityCard.classList.add("city-card"); // Add CSS class for styling
  cityCard.innerHTML = `
    <h2>Location: ${location}</h2>
    <p>${
      remainingDays > 7
        ? `Weather is expected to be: ${weather.description}`
        : `Weather is: ${weather.description}`
    }</p>
    <p>${
      remainingDays > 7
        ? `Forecast: ${weather.temp} &deg;C`
        : `Temperature: ${weather.temp} &deg;C`
    }</p>
    <p>${
      remainingDays > 7 ? `Max temp: ${weather.app_max_temp} &deg;C` : ""
    }</p>
    <p>${
      remainingDays > 7 ? `Min temp: ${weather.app_min_temp} &deg;C` : ""
    }</p>
    <p>Trip Length: ${tripLength} days</p>
    <img src="${picture}" alt="${location}" width="200">
    <hr>
  `;
  // Append the new city card instead of replacing content
  resultsContainer.appendChild(cityCard);
  document.querySelector("#tripData").style.display = "block";
  document.querySelector("#results").style.display = "block";
};

export { updateUI };
