import {
  fetchCityCoordinates,
  fetchWeatherForecast,
  fetchCityImage,
} from "./services/apiService";
import {
  calculateRemainingDays,
  calculateTripLength,
} from "./utils/dateCalculations";
import { validateInputs } from "./utils/validations";
import { updateUI, addTripToSavedTrips } from "./utils/updateUI";

const cityInput = document.querySelector("#city");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");
const savedTripsContainer = document.querySelector("#saved-trips-container");
const cityErrors = document.querySelector("#city-error");

async function handleSubmit(event) {
  event.preventDefault();
  if (!validateInputs(cityInput, startDateInput, endDateInput)) return;

  try {
    const cities = cityInput.value.split(",").map((city) => city.trim());
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const tripLength = calculateTripLength(startDate, endDate);
    const remainingDays = calculateRemainingDays(startDate);

    let storedTrips = JSON.parse(localStorage.getItem("trips")) || [];

    // Create a new trip object with multiple cities
    const tripData = {
      id: storedTrips.length, // Unique trip ID
      cities: [],
      startDate,
      endDate,
      tripLength,
      remainingDays,
      countries: [], // Store country for each city
      weather: [], // Store weather for each city
      images: [], // Store images for each city
    };
    for (const city of cities) {
      const location = await fetchCityCoordinates(city);
      cityErrors.style.display = "none";
      if (!location || location.error) {
        cityErrors.innerHTML = "You need to enter a valid name of a city!";
        cityErrors.style.display = "block";
        return;
      }

      const { cityName, country, latitude, longitude } = location;

      //get the city weather information
      const weather = await fetchWeatherForecast(
        latitude,
        longitude,
        remainingDays
      );

      const { image } = await fetchCityImage(cityName);

      // Store city data inside the trip
      tripData.cities.push(city);
      tripData.countries.push({ city, country });
      tripData.weather.push({ city, ...weather });
      tripData.images.push({ city, image });

      updateUI(
        city,
        country,
        weather,
        remainingDays,
        image,
        tripLength,
        tripData.id
      );
    }

    // Add trip to stored trips
    storedTrips.push(tripData);
    localStorage.setItem("trips", JSON.stringify(storedTrips));

    // Immediately add the new trip to saved trips UI
    addTripToSavedTrips(tripData);
  } catch (error) {
    console.error("Error in handleSubmit:", error);
  }
}

// Function to load saved trips into `#saved-trips-container`
function loadTripsFromStorage() {
  const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];

  if (storedTrips.length === 0) {
    console.log("No trips found in localStorage.");
    return;
  }

  console.log("Loading saved trips from localStorage:", storedTrips);
  savedTripsContainer.innerHTML = "";

  storedTrips.forEach(addTripToSavedTrips);
}

// Remove trip function
function removeTrip(tripId) {
  let storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  storedTrips = storedTrips.filter((trip) => trip.id !== tripId);
  localStorage.setItem("trips", JSON.stringify(storedTrips));

  // Remove from UI
  document.querySelector(`[data-id="${tripId}"]`)?.remove();
}

// Call loadTripsFromStorage() on page load
document.addEventListener("DOMContentLoaded", loadTripsFromStorage);

export { handleSubmit, loadTripsFromStorage, removeTrip };
