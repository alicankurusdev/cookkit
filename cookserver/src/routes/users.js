"use strict";
/* -------------------------------------------------------
Cookkit-USERS-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/users');
const {isLogin,isAdmin}= require("../middlewares/permissions")

// URL -> /users

router.route('/').get(isAdmin,list).post(create);

router.route('/:id').get(isLogin,read).put(isLogin,update).delete(isAdmin,dlt);

/* ------------------------------------------------------- */
module.exports = router