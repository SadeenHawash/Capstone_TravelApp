const axios = require("axios");

const fetchWeatherForecast = async (
  latitude,
  longitude,
  daysRemaining,
  weatherKey
) => {
  try {
    let apiURL;
    // if the trip is within 7 days or is in the future
    if (daysRemaining >= 0 && daysRemaining <= 7) {
      apiURL = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherKey}`;
    } else if (daysRemaining > 7 && daysRemaining <= 16) {
      apiURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&units=M&key=${weatherKey}`;
    } else if (daysRemaining > 16) {
      return { error: "Weatherbit API only accepts up to 16 remaining days." };
    } else {
      return { error: "Invalid number of remaining days provided." };
    }
    const response = await axios.get(apiURL);
    if (
      !response.data ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      return { error: "No weather data found for the given location." };
    }
    if (daysRemaining > 7) {
      // get the information of the last object in the array
      const forcastData = response.data.data[response.data.data.length - 1];
      //console.log({ forcastData });

      return {
        description: forcastData.weather.description,
        temperature: forcastData.temp,
        app_max_temp: forcastData.app_max_temp,
        app_min_temp: forcastData.app_min_temp,
      };
    }
    const { weather, temp } = response.data.data[0];
    return { description: weather.description, temperature: temp };
  } catch (error) {
    console.log("Weather API Error:", error.response?.data || error.message);
    return { error: `Error fetching weather: ${error.message}` };
  }
};
module.exports = { fetchWeatherForecast };
