const axios = require("axios");

const getWeather = async (lat, lng, remainingDays, weatherKey) => {
  try {
    let apiURL;
    // if the trip is within 7 days or is in the future
    if (remainingDays >= 0 && remainingDays <= 7) {
      apiURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherKey}`;
    } else if (remainingDays > 7) {
      apiURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${weatherKey}`;
    } else {
      throw new Error("Invalid date range");
    }
    const { data } = await axios.get(apiURL);
    if (!data.data || data.data.length === 0) {
      throw new Error("Weather data not found");
    }
    if (remainingDays > 7) {
      // get the information of the last object in the array
      const lastWeatherData = data.data[data.data.length - 1];
      return {
        description: lastWeatherData.weather.description,
        temp: lastWeatherData.temp,
        app_max_temp: lastWeatherData.app_max_temp,
        app_min_temp: lastWeatherData.app_min_temp,
      };
    } else {
      const { weather, temp } = data.data[0];
      return { description: weather.description, temp };
    }
  } catch (error) {
    return { error: error.message };
  }
};
module.exports = { getWeather };
