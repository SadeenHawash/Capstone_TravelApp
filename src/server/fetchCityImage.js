const axios = require("axios");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const imageUrl = response.data.hits[0].webformatURL;
    const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "city_images",
      public_id: cityName.replace(/\s+/g, "_"), // Save as city_name.jpg
      overwrite: true,
    });
    return { image: cloudinaryResponse.secure_url };
  } catch (error) {
    return { error: `Failed to retrieve image: ${error.message}` };
  }
};

module.exports = { fetchCityImage };
