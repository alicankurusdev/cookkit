"use strict"

/* -------------------------------------------------------
    EXPRESS - RECIPE API
------------------------------------------------------- */

const express = require("express")
const app=express()

// Nested Query
app.set("query parser", "extended");

//dotenv
require("dotenv").config()
const PORT = process.env?.PORT || 8000

//DB Connect

const {dbConnection}=require("./src/configs/dbConnection");
 dbConnection()

// JSON config:
app.use(express.json());


// Cookie-Session:
app.use(require('cookie-session')({
    keys: [process.env.SECRET_KEY || "default-secret"], // burası şart
}));


// Query Handler:
app.use(require('./src/middlewares/queryHandler'));

// Authentication:
app.use(require('./src/middlewares/auth'));

// Routes

// Home Path
app.all('/', (req, res) => {

    res.status(200).send({
        error: false,
        message: 'Welcome to Personnel API Service',
        session: req.session
    });
});

/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()


// API TODOS
/* -------------------------------------------------------------------------- */

//? -------------------------------- dosya yapisi -------------------------------- */
//? -------------------------------- MIDDLEWARE -------------------------------- */

//? -------------------------------- helpers -------------------------------- */
//? -------------------------------- models -------------------------------- */
//? -------------------------------- controller -------------------------------- */
//? -------------------------------- route -------------------------------- */
//? -------------------------------- ERD -------------------------------- */