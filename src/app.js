const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const newf = path.join(__dirname, "../public");
const viewp = path.join(__dirname, "../temp/views");
const partialp = path.join(__dirname, "../temp/partial");

app.use(express.static(newf));

app.set("view engine", "hbs");
app.set("views", viewp);
hbs.registerPartials(partialp);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather-app",
    name: "AnkitNub",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "So this is the brand new about section",
    name: "AnkitNub",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "So this is the brand new help section",
    name: "AnkitNub",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please provide a address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          Error: "The provided address dosen't match our system",
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            Error: "The given address is unavailable on our website",
          });
        }

        res.send({
          Location: req.query.address,
          Weather_report: forecastData,
          Address: location,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a term to search",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page not available",
    name: "AnkitNub",
    errmsg: "This help service is unavailable",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "The page you are looking for is unavailable",
    name: "AnkitNub",
    errmsg: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
