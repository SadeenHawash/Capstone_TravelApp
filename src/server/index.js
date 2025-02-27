// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Import API functions
const { getCityLocation } = require("./getCityLocation");
const { getWeather } = require("./getWeather");
const { getCityPic } = require("./getCityPic");

// Initialize the Express application
const app = express();
const port = 8000;

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("dist"));

//API
const username = process.env.GEONAMES_USERNAME;
const weatherKey = process.env.WEATHERBIT_KEY;
const picKey = process.env.PIXABAY_KEY;

// Default route
app.get("/", (req, res) => {
  res.render("index.html");
});

// Get city route
app.post("/getCity", async (req, res) => {
  const { city } = req.body;
  const location = await getCityLocation(city, username);
  res.send(location);
});

// Get weather route
app.post("/getWeather", async (req, res) => {
  const { lat, lng, remainingDays } = req.body;
  const weather = await getWeather(lat, lng, remainingDays, weatherKey);
  res.send(weather);
});

// Get city picture route
app.post("/getCityPic", async (req, res) => {
  const { cityName } = req.body;
  const pic = await getCityPic(cityName, picKey);
  res.send(pic);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
