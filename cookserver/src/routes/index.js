"use strict";
/* -------------------------------------------------------
    EXPRESS - MAIN ROUTER
------------------------------------------------------- */
const router = require('express').Router();


//to /users=>
router.use("/users", require("./users.js"));
//to /tokens=>
router.use("/tokens", require("./tokens.js"));
//to /stars=>
router.use("/stars", require("./stars.js"));
//to /comments=>
router.use("/comments", require("./comments.js"));
//to /mealCategories=>
router.use("/mealCategories", require("./mealCategories.js"));
//to /recipes=>
router.use("/recipes", require("./recipes.js"));
//to /auth=>
router.use("/auth", require("./auth.js"));

module.exports = router;

