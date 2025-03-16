const request = require("supertest");
const app = require("../server"); // Import your Express app

describe("Server API Tests", () => {
  // test unknown routes
  test("Server should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
  });
  // test /getCity route
  describe("POST /getCity", () => {
    test("Should return city location when given a valid city", async () => {
      const response = await request(app)
        .post("/getCity")
        .send({ city: "Paris" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("cityName");
      expect(response.body).toHaveProperty("country");
      expect(response.body).toHaveProperty("latitude");
      expect(response.body).toHaveProperty("longitude");
    });

    test("should return 400 for missing city", async () => {
      const response = await request(app).post("/getCity").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "City name is required.");
    });
  });

  // test /getWeather route
  // describe("POST /getWeather", () => {
  //   const validWeatherRequest = {
  //     latitude: 48.8566,
  //     longitude: 2.3522,
  //     daysRemaining: 5,
  //   };

  //   test("Should return weather data for a valid request", async () => {
  //     const response = await request(app)
  //       .post("/getWeather")
  //       .send(validWeatherRequest);
  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("description");
  //     expect(response.body).toHaveProperty("temperature");
  //   });
  //   test("Should return forecast weather for future dates (daysRemaining > 7)", async () => {
  //     const response = await request(app).post("/getWeather").send({
  //       latitude: 48.8566,
  //       longitude: 2.3522,
  //       daysRemaining: 10,
  //     });
  //     console.log(response.status); // Log the status code
  //     console.log(response.body);
  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("description");
  //     expect(response.body).toHaveProperty("temperature");
  //     expect(response.body).toHaveProperty("app_max_temp");
  //     expect(response.body).toHaveProperty("app_min_temp");
  //   });

  //   test("Should return 400 for missing parameters", async () => {
  //     const response = await request(app).post("/getWeather").send({});
  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty(
  //       "error",
  //       "Missing required parameters."
  //     );
  //   });

  //   test("Should return 400 for invalid daysRemaining", async () => {
  //     const response = await request(app)
  //       .post("/getWeather")
  //       .send({ latitude: 48.8566, longitude: 2.3522, daysRemaining: "abc" });

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty(
  //       "error",
  //       "Invalid value for daysRemaining."
  //     );
  //   });

  //   test("Should return 400 for negative daysRemaining", async () => {
  //     const response = await request(app)
  //       .post("/getWeather")
  //       .send({ latitude: 48.8566, longitude: 2.3522, daysRemaining: -3 });

  //     expect(response.status).toBe(400);
  //     expect(response.body).toHaveProperty(
  //       "error",
  //       "Invalid value for daysRemaining."
  //     );
  //   });
  // });
});
