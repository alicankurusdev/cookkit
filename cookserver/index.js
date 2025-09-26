"use strict";

/* -------------------------- EXPRESS - RECIPE API -------------------------- */

const express = require("express");
const app = express();

/* ------Nested Query Enables parsing query strings into nested objects and arrays----------- */
app.set("query parser", "extended");

/* ------Loads environment variables from .env file into process.env---------- */
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/* ------------------------------- DB Connect ------------------------------- */
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------Parses incoming request bodies with JSON payloads and makes them available under req.body---------- */
app.use(express.json());

/* ------Enables cookie-based sessions by storing session data on the client within a signed cookie---------- */
app.use(
  require("cookie-session")({
    keys: [process.env.SECRET_KEY || "default-secret"], // burası şart
  })
);

/* ------------------------------ QUERYHANDLER ------------------------------ */
/* ------Custom middleware to parse and handle query parameters globally before reaching the routes---------- */
app.use(require("./src/middlewares/queryHandler"));

/* ----------------------------- Authentication ----------------------------- */
/* ------Custom authentication middleware to protect routes by verifying JWT or session before access---------- */
app.use(require("./src/middlewares/auth"));



/* -------------------------------- Home Path ------------------------------- */
app.all("/", (req, res) => {
  res.status(200).send({
    error: false,
    message: "Welcome to COOKKIT API Service",
    session: req.session,
  });
});

/* -------------------------------- ROUTES -------------------------------- */

app.use("/", require("./src/routes"));

/* ------------------------------ invalid route ----------------------------- */

app.all("/*splat", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route is not available",
  });
});

/* ------------------------------ ErrorHandler ------------------------------ */
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------- RUN SERVER ------------------------------- */
app.listen(PORT, () => console.log("API IS RUNNING ON:" + PORT));

/* -----------------SEED DATA---------------------- */

// require('./src/helpers/sync')()  //?only once

// API TODOS
/* -------------------------------------------------------------------------- */


//? -------------------------------- MIDDLEWARE -------------------------------- */
//?auth
//?errorhandler
//?errorhandler
//? permissions
//? queryhandler

//? -------------------------------- helpers -------------------------------- */
//? -------------------------------- swagger -------------------------------- */
//? -------------------------------- develop controllers -------------------------------- */
