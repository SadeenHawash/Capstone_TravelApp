import axios from "axios";

const getCity = async (form) => {
  const { data } = await axios.post("http://localhost:8000/getCity", form, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

const getWeather = async (lat, lng, remainingDays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lat,
    lng,
    remainingDays,
  });
  return data;
};

const getCityPicture = async (cityName) => {
  const { data } = await axios.post("http://localhost:8000/getCityPic", {
    cityName,
  });
  return data;
};

export { getCity, getWeather, getCityPicture };
