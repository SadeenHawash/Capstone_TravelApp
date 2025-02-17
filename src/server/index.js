// Import required dependencies
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Initialize the Express application
const app = express();
const port = 8000;

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("dist"));

//API
const geoKey = process.env.GEONAMES_USERNAME;
// Encapsulated function to scrape text from a URL
async function scrapeTextFromURL(url) {
  try {
    //console.log(`Fetching and scraping text from URL: ${url}`);

    // Increased timeout duration
    const { data } = await axios.get(url, { timeout: 20000 });
    //console.log("Fetched Data:", data);

    // Use Cheerio to parse HTML
    const $ = cheerio.load(data);
    const text = $("article p").text().trim(); // Targeting article paragraphs

    if (!text) {
      console.error("No text content found at the provided URL");
      return null;
    }

    const trimmedText = text.slice(0, 200); // Limit to 200 characters for initial analysis
    //console.log(`Extracted Text (200 characters):\n${trimmedText}`);
    return trimmedText;
  } catch (error) {
    console.error("Error while scraping text from the URL:", error.message);
    throw new Error("Failed to scrape text from the URL");
  }
}

// Route to analyze text from a URL
app.post("/analyze-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Step 1: Scrape the content from the URL
    const scrapedText = await scrapeTextFromURL(url);
    if (!scrapedText) {
      return res.status(400).json({ error: "No text content found" });
    }

    // Step 2: Extract "Input Text Preview"
    const inputTextPreview = scrapedText;

    // Step 3: Call AWS NLP API for sentiment analysis
    const apiResponse = await axios.post(
      "https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer",
      { text: scrapedText }
    );

    const sentimentData = apiResponse.data.sentiment; // Assuming the API returns sentiment analysis

    // Step 4: Infer "Content Type" based on sentiment
    let contentType = "Objective"; // Default to Objective
    if (
      sentimentData.sentiment === "Positive" ||
      sentimentData.sentiment === "Negative"
    ) {
      contentType = "Subjective";
    }
    // console.log(
    //   `${contentType} ----- ${sentimentData} ------- ${inputTextPreview}`
    // );

    // Step 5: Return enhanced response
    return res.json({
      sentiment: sentimentData,
      contentType: contentType,
      inputTextPreview: inputTextPreview,
    });
  } catch (error) {
    console.error("Error during analysis:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to analyze the URL", message: error.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.render("index.html");
  //   res.send(
  //     "This is the server API page. You may access its services via the client app."
  //   );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
