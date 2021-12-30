const express = require("express");
const config = require("config");
const { fetchWeatherData } = require("../utils/weatherData");
const router = express.Router();

router.get("/:latitude&:longitude", async (req, res) => {
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  if (!latitude || !longitude)
    return res.status(400).send("Pleast enter latitude and longitude.");
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${config.get(
    "apiKey"
  )}`;
  let result;

  try {
    result = await fetchWeatherData(api);
    if (!result.data) return res.status(400).send(null);
    res.send(result.data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  if (!city) return res.status(400).send("Please enter a city.");
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.get(
    "apiKey"
  )}`;
  let result;

  try {
    result = await fetchWeatherData(api);
    if (!result) return res.status(400).send(null);
    res.send(result.data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
