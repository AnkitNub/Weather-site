const request = require("postman-request");
const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=04fd7581fb7c275fc47dcf3ddfc95c2d&query=${lat},${long}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to Connect to the Internet");
    } else if (response.body.error) {
      callback(response.body.error.info);
    } else {
      const data = response.body.current;
      const msg = `The temperature is currently ${data.temperature} and their is a ${data.precip}% chance of rain`;
      callback(undefined, msg);
    }
  });
};
module.exports = forecast;
