const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7b4061f6cbc2e0935e6e9d8f76e39fca&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", error);
    } else if (body.error) {
      callback("Unable to find location.", error);
    } else {
      // console.log(
      //   `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees. `
      //);
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}% and UV Index is ${body.current.uv_index}. `
      );
    }
  });
};

module.exports = forecast;
