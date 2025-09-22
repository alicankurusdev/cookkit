"use strict";
/* -------------------------------------------------------
Cookkit-Tokens-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/tokens');
const {isAdmin}= require("../middlewares/permissions")
// URL -> /tokens

router.route('/').get(isAdmin,list).post(isAdmin,create);

router.route('/:id').get(isAdmin,read).put(isAdmin,update).delete(isAdmin,dlt);

/* ------------------------------------------------------- */
module.exports = router