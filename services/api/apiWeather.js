const axios = require("axios");
const { appid } = require("../../resource");

const getCurrentTemperature = async (coordinateCity) => {
  const lat = coordinateCity.lat;
  const long = coordinateCity.long;
  const queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appid}`;

  const data = await axios.get(queryURL);

  const temperature = Math.floor(parseInt(data.data.main.temp) - 273.15);

  return temperature;
};

module.exports = getCurrentTemperature;
