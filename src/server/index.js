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
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }
    const location = await getCityLocation(city, username);
    res.send(location);
  } catch (error) {
    console.error("Error fetching city location:", error.message);
    res.status(500).json({ error: "Failed to fetch city location" });
  }
});

// Get weather route
app.post("/getWeather", async (req, res) => {
  try {
    const { lat, lng, remainingDays } = req.body;
    if (!lat || !lng || remainingDays === undefined) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    if (isNaN(remainingDays) || remainingDays < 0) {
      return res.status(400).json({ error: "Invalid remainingDays value" });
    }
    const weather = await getWeather(lat, lng, remainingDays, weatherKey);

    if (!weather || weather.error) {
      return res.status(404).json({ error: "Weather data not found" });
    }

    res.send(weather);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Get city picture route
app.post("/getCityPic", async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      return res.status(400).json({ error: "City name is required" });
    }
    const pic = await getCityPic(cityName, picKey);
    res.send(pic);
  } catch (error) {
    console.error("Error fetching city picture:", error.message);
    res.status(500).json({ error: "Failed to fetch city picture" });
  }
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// Export app for testing
module.exports = app;

// Start server only if running directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
