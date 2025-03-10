const axios = require("axios");

const fetchCityImage = async (cityName, picKey) => {
  try {
    const pixabayURL = `https://pixabay.com/api/?key=${picKey}&q=${cityName}&image_type=photo`;
    const response = await axios.get(pixabayURL);
    if (!response.data.hits || response.data.hits.length === 0) {
      return {
        image:
          "https://www.televes.com/media/wysiwyg/televes/error-televes.jpg",
        message: "No relevant image found, displaying default error image.",
      };
    }
    return { image: response.data.hits[0].webformatURL };
  } catch (error) {
    return { error: `Failed to retrieve image: ${error.message}` };
  }
};

module.exports = { fetchCityImage };
