import axios from "axios";
import DOMPurify from "dompurify";
import { checkForUrl } from "./urlChecker";

const serverURL = "http://localhost:8000/analyze-url";
const resultsContainer = document.getElementById("results");
const inputUrl = document.getElementById("url");

async function handleSubmit(event) {
  event.preventDefault();

  const url = inputUrl.value.trim();

  if (!url) {
    showError("URL cannot be blank.");
    return;
  }

  // Reset results container for each new submission
  resultsContainer.innerHTML = "";

  if (!checkForUrl(url)) {
    showError(
      "Invalid URL. Please enter a valid URL (e.g., https://example.com)."
    );
    return;
  }

  toggleLoadingState(true);

  try {
    const sanitizedUrl = DOMPurify.sanitize(url);
    const response = await sendToServer(sanitizedUrl);
    if (response) {
      updateUI(response);
    } else {
      showError("No valid analysis data received.");
    }
  } catch (error) {
    console.error("Error fetching analysis:", error);
    showError("Failed to analyze the URL. Please try again.");
  }
}

async function sendToServer(url) {
  try {
    const response = await axios.post(serverURL, { url });
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
    return null;
  }
}

function updateUI(data) {
  resultsContainer.innerHTML = `
    <h2>Sentiment Analysis:</h2><br/><br/>
    <p><strong>Sentiment:</strong> ${data.sentiment || "Not available"}</p><br/>
    <p><strong>Content Type:</strong> ${
      data.contentType || "Not available"
    }</p><br/>
    <p><strong>Input Text Preview:</strong> "${
      data.inputTextPreview || "No text preview available"
    }"</p>
  `;
}

function showError(message) {
  if (!resultsContainer) return;
  resultsContainer.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${message}</p>`;
}

function toggleLoadingState(isLoading) {
  const submitButton = document.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = isLoading;
  if (!resultsContainer) return;
  resultsContainer.innerHTML = isLoading ? "<p>Loading...</p>" : "";
}

export { handleSubmit };
