"use strict"
/* -------------------------------------------------------
    EXPRESS - RECIPE API - AUTH ROUTE
------------------------------------------------------- */
const router = require('express').Router();
const { login, logout, refresh } = require('../controllers/auth');
/* ------------------------------------------------------- */
// URL -> /auth

router.route('/login').post( login);
router.route('/logout').post( logout);
router.route('/refresh').post( refresh);


/* ------------------------------------------------------- */
module.exports = router