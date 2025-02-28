import axios from "axios";

const getCity = async (form) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCity", form, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error.message);
    return null;
  }
};

const getWeather = async (lat, lng, remainingDays) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getWeather", {
      lat,
      lng,
      remainingDays,
    });
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
};

const getCityPicture = async (cityName) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCityPic", {
      cityName,
    });
    return data;
  } catch (error) {
    console.error("Error fetching city picture:", error.message);
    return null;
  }
};

export { getCity, getWeather, getCityPicture };
