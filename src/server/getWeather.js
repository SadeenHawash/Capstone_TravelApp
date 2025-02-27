const axios = require("axios");

const getWeather = async (lat, lng, remainingDays, weatherKey) => {
  // if the trip is within 7 days or is in the future
  if (remainingDays > 0 && remainingDays <= 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherKey}`
    );
    const { weather, temp } = data.data[0];
    const { description } = weather;
    const weather_data = { description, temp };
    return weather_data;
  } else if (remainingDays > 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${weatherKey}`
    );
    // get the information of the last object in the array
    const { weather, temp, app_max_temp, app_min_temp } =
      data.data[data.data.length - 1];
    const { description } = weather;
    const weather_data = { description, temp, app_max_temp, app_min_temp };
    return weather_data;
  }
};

module.exports = { getWeather };
