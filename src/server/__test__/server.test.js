const request = require("supertest");
const app = require("../index"); // Import your Express app

describe("Server API Tests", () => {
  // test unknown routes
  test("Server should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
  });
  // test /getCity route
  test("POST /getCity should return city location", async () => {
    const response = await request(app)
      .post("/getCity")
      .send({ city: "Paris" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("countryName");
    expect(response.body).toHaveProperty("lat");
    expect(response.body).toHaveProperty("lng");
  });

  test("POST /getCity should return 400 for missing city", async () => {
    const response = await request(app).post("/getCity").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "City is required");
  });

  // test /getCity route
  describe("POST /getWeather", () => {
    const validWeatherRequest = {
      lat: 48.8566,
      lng: 2.3522,
      remainingDays: 5,
    };

    test("Should return weather data for a valid request", async () => {
      const response = await request(app)
        .post("/getWeather")
        .send(validWeatherRequest);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("temp");
    });
    test("Should return forecast weather for future dates (remainingDays > 7)", async () => {
      const response = await request(app).post("/getWeather").send({
        lat: 48.8566,
        lng: 2.3522,
        remainingDays: 10,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("temp");
      expect(response.body).toHaveProperty("app_max_temp");
      expect(response.body).toHaveProperty("app_min_temp");
    });

    test("Should return 400 for missing parameters", async () => {
      const response = await request(app).post("/getWeather").send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Missing required parameters"
      );
    });

    test("Should return 400 for invalid remainingDays", async () => {
      const response = await request(app)
        .post("/getWeather")
        .send({ lat: 48.8566, lng: 2.3522, remainingDays: "abc" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Invalid remainingDays value"
      );
    });

    test("Should return 400 for negative remainingDays", async () => {
      const response = await request(app)
        .post("/getWeather")
        .send({ lat: 48.8566, lng: 2.3522, remainingDays: -3 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Invalid remainingDays value"
      );
    });
  });
});
