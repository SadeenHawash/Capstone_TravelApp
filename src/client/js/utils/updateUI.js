// Get the elements from the DOM
const tripInfo = document.querySelector("#trip-data");
const savedTripsContainer = document.querySelector("#saved-trips-container");
import { removeTrip } from "../formHandler";

// Function to update trip-date
const updateUI = (
  city,
  countryName,
  weather,
  remainingDays,
  picture,
  tripLength
) => {
  // Create a new city card
  const cityCard = document.createElement("div");
  cityCard.classList.add("city-card");
  cityCard.innerHTML = `
    <h3>Trip to ${city}, ${countryName}</h3>
    <p>Your trip starts ${
      remainingDays == 0 ? "Today" : `in ${remainingDays}`
    } ${remainingDays > 1 ? "days" : "day"} from now!!</p>
    <p>${
      remainingDays > 7
        ? `Weather is expected to be: ${weather.description}`
        : `Weather is: ${weather.description}`
    }</p>
    <p>${
      remainingDays > 7
        ? "Typical weather for then is:"
        : `Temperature: ${weather.temperature} &deg;C`
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
  tripInfo.appendChild(cityCard);
  document.querySelector("#trip-data").style.display = "block";
};

// Function to dynamically add a trip to saved-trips-container
function addTripToSavedTrips(trip) {
  const tripElement = document.createElement("div");
  tripElement.classList.add("saved-trip");
  tripElement.dataset.id = trip.id;

  const citiesList = trip.cities
    .map((city, index) => {
      return `
      <div>
      </br>
        <h3>${city}, ${trip.countries[index].country}</h3>
        <p>${
          trip.remainingDays > 7
            ? `Weather is expected to be: ${trip.weather[index].description}`
            : `Weather is: ${trip.weather[index].description}`
        }</p>
        <p>${
          trip.remainingDays > 7
            ? "Typical weather for then is:"
            : `Temperature: ${trip.weather[index].temperature} &deg;C`
        }</p>
        <p>${
          trip.remainingDays > 7
            ? `Max temp: ${trip.weather[index].app_max_temp} &deg;C`
            : ""
        }</p>
        <p>${
          trip.remainingDays > 7
            ? `Min temp: ${trip.weather[index].app_min_temp} &deg;C`
            : ""
        }</p>
        <img src="${trip.images[index].image}" alt="${city}" width="100">
      </div>
    `;
    })
    .join("");

  tripElement.innerHTML = `
    <h2>Trip to ${trip.cities.join(", ")}</h2>
    <p>Start Date: ${trip.startDate}</p>
    <p>End Date: ${trip.endDate}</p>
    <p>Trip Length: ${trip.tripLength} days</p>
    <p>Remaining Days: ${trip.remainingDays}</p>
    ${citiesList}
    <button class="remove-trip" data-id="${trip.id}">Remove Trip</button>
  `;

  savedTripsContainer.appendChild(tripElement);

  // Attach event listener to the button
  tripElement
    .querySelector(".remove-trip")
    .addEventListener("click", (event) => {
      const tripId = parseInt(event.target.dataset.id);
      removeTrip(tripId);
    });
}

export { updateUI, addTripToSavedTrips };
