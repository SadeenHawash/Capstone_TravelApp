NodeJS version: v22.13.1

# 🌍 Travel Planner

A simple travel planning app that allows users to save their trips, including destination, travel dates, weather information, and images, using Local Storage for persistence.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)

## 🚀 Features

- ✅ **Add multiple trip destinations.**
- ✅ **Automatically calculates trip length and remaining days.**
- ✅ **Displays weather forecast based on departure date:**
  - **If less than 7 days left** → Shows **current weather & temperature.**
  - **If more than 7 days left** → Shows **weather description, temperature, and min/max temperature.**
- ✅ **Fetches a city image.**
- ✅ **Saves trip data in Local Storage so trips are not lost after refreshing.**
- ✅ **User can remove trips from the planner.**
- ✅ **Service Worker:** The app includes a service worker for offline capabilities and caching.

## 🛠️ Technologies Used

- **HTML, CSS, JavaScript:** Frontend.
- **Node.js:** Backend server for handling requests.
- **Local Storage:** Persistent Data.
- **Geonames API:** Used to get the latitude, longitude, country.
- **Weatherbit API:** Used to get the weather forcast based on the departure date.
- **Pixabay API:** Used to get a city picture.
- **Service Worker:** For caching and offline support on the client side.

## 📌 Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:SadeenHawash/Capstone_TravelApp.git
   cd Capstone_TravelApp
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

## 📝 Usage

1. **Access the app:** Open your browser and go to http://localhost:8000 to interact with the app.
2. **Enter your trip details:**
   - Destination(s) (comma-separated for multiple cities).
   - Start Date.
   - End Date.
3. Click **"Add Trip".**
4. **The trip will be displayed, showing:**

   - Remaining days.
   - Weather forecast.
   - Trip duration.
   - Destination image.

5. **Refresh the page** → Your trip will still be there! 🎉
6. To **remove a trip**, click the **"Remove Trip"** button.

## 👨‍💻 Author

Sadeen Hawash
