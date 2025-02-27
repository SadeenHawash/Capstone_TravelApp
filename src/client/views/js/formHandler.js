import axios from "axios";
import { calculateRemainingDays } from "./calculateRemainingDays";
import { calculateTripLength } from "./calculateTripLength";

const form = document.querySelector("form");
const cityInput = document.querySelector("#city");
const startDateInput = document.querySelector("#start-date");
const endDateInput = document.querySelector("#end-date");

async function handleSubmit(event) {
  event.preventDefault();
  // get the city location
  const location = await getCity();
  const { name, lat, lng } = location;
  // get the dates input value
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  // calculate the trip duration
  const tripLength = calculateTripLength(startDate, endDate);
  // calculate the remaining days form the current date
  const remainingDays = calculateRemainingDays(startDate);
  // get the city weather information
  const weather = await getWeather(lat, lng, remainingDays);
  // get the city picture
  const { image } = await getCityPicture(name);
  // update the UI
  updateUI(cityInput.value, weather, remainingDays, image, tripLength);
}

// get the city location
const getCity = async () => {
  const { data } = await axios.post("http://localhost:8000/getCity", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

// get the city weather information
const getWeather = async (lat, lng, remainingDays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lat,
    lng,
    remainingDays,
  });
  return data;
};

// get the city picture
const getCityPicture = async (name) => {
  const { data } = await axios.post("http://localhost:8000/getCityPic", {
    name,
  });
  return data;
};

// update the UI

const updateUI = (location, weather, remainingDays, picture, tripLength) => {
  // update the remaining days
  document.querySelector(
    "#rDays"
  ).innerHTML = `Your trip starts in ${remainingDays} days from now!!`;
  // update the city name
  document.querySelector(".city-name").innerHTML = `Location: ${location}`;
  // update the weather information
  document.querySelector(".weather").innerHTML =
    remainingDays > 7
      ? `Weather is expected to be: ${weather.description}`
      : `Weather is: ${weather.description}`;
  // update the temperature information
  document.querySelector(".temp").innerHTML =
    remainingDays > 7
      ? `Forcast: ${weather.temp} &deg C`
      : `Temprature: ${weather.temp} &deg C`;
  // update the max and min temperature
  document.querySelector(".max-temp").innerHTML =
    remainingDays > 7 ? `Max temp: ${weather.app_max_temp} &deg C` : "";
  document.querySelector(".min-temp").innerHTML =
    remainingDays > 7 ? `Min temp: ${weather.app_min_temp} &deg C` : "";
  //update the trip length
  document.querySelector(
    ".trip-length"
  ).innerHTML = `Trip Length: ${tripLength} days`;
  // update the picture
  document.querySelector(".city-pic").innerHTML = `
  <img
  src="${picture}" 
  alt="an image that describes the city nature"
  />
  `;
  document.querySelector("#flightData").style.display = "block";
};

export { handleSubmit };
