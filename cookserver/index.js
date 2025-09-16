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
// app.use(require('./src/middlewares/auth'));

// Routes

// Home Path
app.all('/', (req, res) => {

    res.status(200).send({
        error: false,
        message: 'Welcome to COOKKIT API Service',
        session: req.session
    });
});

//! ROUTES

app.use('/users', require('./src/routes/users'));
app.use('/tokens', require('./src/routes/tokens.js'));
app.use('/stars', require('./src/routes/stars.js'));
app.use('/comments', require('./src/routes/comments.js'));
app.use('/mealCategories', require('./src/routes/mealCategories.js'));
app.use('/recipes', require('./src/routes/recipes.js'));
app.use('/auth', require('./src/routes/auth.js'));

/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:a
app.listen( PORT, () => console.log('API IS RUNNING ON:' + PORT))

/* ------------------------------------------------------- */
// require('./src/helpers/sync')()


// API TODOS
/* -------------------------------------------------------------------------- */

//? -------------------------------- ERD -------------------------------- */
//? -------------------------------- dosya yapisi -------------------------------- */
//? -------------------------------- models -------------------------------- */
//? -------------------------------- controller -------------------------------- */
//? -------------------------------- route -------------------------------- */
//? -------------------------------- MIDDLEWARE -------------------------------- */
//? -------------------------------- helpers -------------------------------- */
//? -------------------------------- swagger -------------------------------- */
//? -------------------------------- develop controllers -------------------------------- */