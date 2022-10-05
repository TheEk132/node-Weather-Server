const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Eugene Keehan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Eugene Keehan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page.",
    name: "Eugene Keehan",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello express. ");
// });

// app.get("/help", (req, res) => {
//   res.send("Help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page.</h1>");
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    errorMessage: "Help article not found.",
    name: "Eugene Keehan",
  });
});

//for all other urls (* = wildcard)
app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "Page not found.",
    name: "Eugene Keehan",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000. ");
});
