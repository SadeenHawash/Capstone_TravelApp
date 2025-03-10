const axios = require("axios");

const fetchCityCoordinates = async (cityName, username) => {
  try {
    const geonamesURL = `https://secure.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${username}`;
    const response = await axios.get(geonamesURL);
    if (!response.data.geonames || response.data.geonames.length === 0) {
      return { error: `City "${cityName}" not found in GeoNames database.` };
    }
    const { name, countryName, lat, lng } = response.data.geonames[0];

    return {
      cityName: name,
      country: countryName,
      latitude: lat,
      longitude: lng,
    };
  } catch (error) {
    return { error: `Error retrieving location: ${error.message}` };
  }
};

module.exports = { fetchCityCoordinates };
