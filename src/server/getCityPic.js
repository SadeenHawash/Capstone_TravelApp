const axios = require("axios");

const getCityPic = async (cityName, picKey) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${picKey}&q=${cityName}&image_type=photo`
  );
  if (data.hits.length > 0) {
  }
  const image = (await data.hits[0])
    ? data.hits[0].webformatURL
    : "https://source.unsplash.com/random/640x480?city,morning,night?sig=1";
  if (image) {
    return { image };
  }
};

module.exports = { getCityPic };
