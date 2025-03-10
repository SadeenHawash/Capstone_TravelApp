import axios from "axios";

const fetchCityCoordinates = async (city) => {
  try {
    const cityCoordinatesResponse = await axios.post(
      "http://localhost:8000/getCity",
      { city }
    );
    return cityCoordinatesResponse.data;
  } catch (error) {
    console.error("Error fetching city data:", error.message);
    return null;
  }
};

const fetchWeatherForecast = async (latitude, longitude, daysRemaining) => {
  try {
    const weatherResponse = await axios.post(
      "http://localhost:8000/getWeather",
      {
        latitude,
        longitude,
        daysRemaining,
      }
    );
    return weatherResponse.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
};

const fetchCityImage = async (cityName) => {
  try {
    const imageResponse = await axios.post("http://localhost:8000/getCityPic", {
      cityName,
    });
    return imageResponse.data;
  } catch (error) {
    console.error("Error fetching city picture:", error.message);
    return null;
  }
};

export { fetchCityCoordinates, fetchWeatherForecast, fetchCityImage };
