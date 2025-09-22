"use strict";
/* -------------------------------------------------------
Cookkit-Stars-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/stars');
const {isLogin,isAdmin} = require('../middlewares/permissions'); // isMember, isAdmin middleware


// URL -> /stars

router.route('/').get(isAdmin,list).post(isLogin,create);

router.route('/:id').get(isAdmin,read).put(isLogin,update).delete(isAdmin,dlt);

/* ------------------------------------------------------- */
module.exports = router