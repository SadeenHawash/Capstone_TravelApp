const axios = require("axios");

const getCityLocation = async (city, username) => {
  const { data } = await axios.get(
    `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
  );
  const { name, lat, lng } = await data.geonames[0];
  return { name, lat, lng };
};

module.exports = { getCityLocation };
