const axios = require("axios");

const getCityLocation = async (city, username) => {
  try {
    const { data } = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
    );
    if (data.geonames.length === 0) {
      throw new Error(
        "No city with that name. Please make sure of your spelling."
      );
    }
    const { name, countryName, lat, lng } = await data.geonames[0];
    return { name, countryName, lat, lng };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getCityLocation };
