const axios = require("axios");

const getCityLocation = async (city, username) => {
  try {
    const { data } = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
    );
    if (!data.geonames || data.geonames.length === 0) {
      return { error: "City not found" };
    }
    const { name, lat, lng } = await data.geonames[0];
    return { name, lat, lng };
  } catch (error) {
    return { error: "Failed to fetch city location" };
  }
};

module.exports = { getCityLocation };
