// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Import API functions
const { fetchCityCoordinates } = require("./fetchCityCoordinates");
const { fetchWeatherForecast } = require("./fetchWeatherForecast");
const { fetchCityImage } = require("./fetchCityImage");

// Initialize the Express application
const app = express();
const port = 8000;

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("dist"));

//API
const GEONAMES_API_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHER_API_KEY = process.env.WEATHERBIT_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_KEY;

// Get city route
app.post("/getCity", async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: "City name is required." });
  }
  const location = await fetchCityCoordinates(city, GEONAMES_API_USERNAME);

  if (location.error) {
    return res.status(400).json(location);
  }
  res.json(location);
});

// Get weather route
app.post("/getWeather", async (req, res) => {
  const { latitude, longitude, daysRemaining } = req.body;
  if (!latitude || !longitude || daysRemaining === undefined) {
    return res.status(400).json({ error: "Missing required parameters." });
  }
  if (isNaN(daysRemaining) || daysRemaining < 0) {
    return res.status(400).json({ error: "Invalid value for daysRemaining." });
  }
  const weather = await fetchWeatherForecast(
    latitude,
    longitude,
    daysRemaining,
    WEATHER_API_KEY
  );

  if (weather.error) {
    return res.status(400).json(weather);
  }
  res.json(weather);
});

// Get city picture route
app.post("/getCityPic", async (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }
  const pic = await fetchCityImage(cityName, PIXABAY_API_KEY);
  if (pic.error) {
    return res.status(400).json(pic);
  }
  res.json(pic);
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// Start server only if running directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Default route
app.get("/", (req, res) => {
  res.render("index.html");
});

// Export app for testing
module.exports = app;
