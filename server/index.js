/* eslint-disable no-unused-vars */
const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");

//Allow Cross origin Cookies
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// body parsing middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static middleware
app.use(express.static(path.join(__dirname, "../public")));

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
