const request = require("postman-request");

//Geocoding (convert location name to lat/long coordinates)
//Address -> Lat/Long -> Weather
const geocode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidGhlZWsxMzIiLCJhIjoiY2w4cTQ2Y2NzMXc2aDNvcGl6dXltaXZ3dSJ9.s1VgsYimT40vDrnWMxIFmA`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocode services.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
