import { getCity, getWeather, getCityPicture } from "./services/apiService";
import {
  calculateRemainingDays,
  calculateTripLength,
} from "./utils/dateCalculations";
import { validateInputs } from "./utils/validations";
import { updateUI } from "./utils/updateUI";

const cityInput = document.querySelector("#city");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");

async function handleSubmit(event) {
  event.preventDefault();
  // validate the inputs
  if (!validateInputs(cityInput, startDateInput, endDateInput)) return;
  try {
    // Get the list of cities from input
    const cities = cityInput.value.split(",").map((city) => city.trim());
    // get the dates input value
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    // calculate the trip duration
    const tripLength = calculateTripLength(startDate, endDate);
    // calculate the remaining days form the current date
    const remainingDays = calculateRemainingDays(startDate);

    // Loop over each city and fetch data
    for (const city of cities) {
      // Get the city location
      const location = await getCity({ city });

      if (!location) continue;

      const { name, lat, lng } = location;
      console.log({ name, lat, lng });
      // Get the weather and city picture
      const weather = await getWeather(lat, lng, remainingDays);
      console.log(weather);

      const { image } = await getCityPicture(name);

      console.log({ city, weather, remainingDays, image, tripLength });

      // Update UI for each city
      updateUI(city, weather, remainingDays, image, tripLength);
    }
  } catch (error) {
    //console.error("Error handling submit:", error);
    console.log("error in handle submit");
  }
}

export { handleSubmit };
