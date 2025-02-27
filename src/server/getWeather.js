const axios = require("axios");

const getWeather = async (lat, lng, remainingDays, weatherKey) => {
  try {
    // if the trip is within 7 days or is in the future
    if (remainingDays > 0 && remainingDays <= 7) {
      const { data } = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherKey}`
      );
      if (!data.data || data.data.length === 0) {
        return { error: "Weather data not found" };
      }
      const { weather, temp } = data.data[0];
      return { description: weather.description, temp };
    } else if (remainingDays > 7) {
      const { data } = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${weatherKey}`
      );
      if (!data.data || data.data.length === 0) {
        return { error: "Weather forecast data not found" };
      }
      // get the information of the last object in the array
      const lastWeatherData = data.data[data.data.length - 1];
      return {
        description: lastWeatherData.weather.description,
        temp: lastWeatherData.temp,
        app_max_temp: lastWeatherData.app_max_temp,
        app_min_temp: lastWeatherData.app_min_temp,
      };
    } else {
      return { error: "Invalid date range" };
    }
  } catch (error) {
    return { error: "Failed to fetch weather data" };
  }
};
module.exports = { getWeather };
