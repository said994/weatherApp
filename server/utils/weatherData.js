const axios = require("axios");

fetchWeatherData = async (api) => {
  try {
    const result = await axios.get(api);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchWeatherData };
