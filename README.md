NodeJS version: v22.13.1

# Evaluate a News Article with Natural Language Processing

This project is a simple web application built using Express, Node.js, and Cheerio for web scraping, along with a client-side JavaScript app to interact with the server. The app allows users to enter an article URL, scrape the text content, and analyze it for sentiment using AWS NLP services.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- **Scrape Content**: Fetch and extract the text from an article using a URL.
- **Sentiment Analysis**: Perform sentiment analysis on the scraped content to classify it as "Positive", "Negative", or "Neutral".
- **Content Type**: Automatically categorize the content based on sentiment (Objective or Subjective).
- **Service Worker**: The app includes a service worker for offline capabilities and caching.

## Technologies Used

- **Node.js**: Backend server for handling requests.
- **Express**: Web framework for routing and static file serving.
- **Cheerio**: Library for scraping and parsing HTML content.
- **AWS NLP API**: Used for sentiment analysis of scraped text.
- **Service Worker**: For caching and offline support on the client side.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SadeenHawash/evaluate-news-nlp.git
   cd evaluate-news-nlp
   ```

2. Install dependencies for the server:

   ```bash
   npm install
   ```

3. Build the front-end (client) code:

   ```bash
   npm run build

   ```

4. Start the server:

   ```bash
   npm run start
   ```

   This will start the backend server on http://localhost:8000.

## Usage

1. **Access the app**: Open your browser and go to http://localhost:8000 to interact with the app..
2. **Submit a URL**: Enter an article URL in the input field and click the "Submit" button.
3. The app will scrape the text from the provided URL and display the sentiment analysis results along with content type.

## License

This project is licensed under the MIT License.
