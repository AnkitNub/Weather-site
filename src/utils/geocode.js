const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5raXRudWIiLCJhIjoiY2t2dDgxNjZ5ODkwNDJwbXMzNDZ2eHV5ayJ9.uUhJd5o52dQ-F3lgnq8GpQ&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to Connect to the Internet");
    } else if (response.body.features.length === 0) {
      callback("Unable to get the location");
    } else {
      const [longitude, latitude] =
        response.body.features[0].geometry.coordinates;
      const data = {
        longitude,
        latitude,
        location: response.body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};
module.exports = geocode;
