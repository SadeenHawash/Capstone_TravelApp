const axios = require("axios");

const getCityPic = async (cityName, picKey) => {
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${picKey}&q=${cityName}&image_type=photo`
    );
    if (!data.hits || data.hits.length === 0) {
      return {
        image:
          "https://www.televes.com/media/wysiwyg/televes/error-televes.jpg",
      };
    }
    return { image: data.hits[0].webformatURL };
  } catch (error) {
    return { error: "Failed to fetch city image" };
  }
};

module.exports = { getCityPic };
