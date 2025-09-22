"use strict";
/* -------------------------------------------------------
Cookkit-Recipes-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/recipes');
const {isLogin} = require('../middlewares/permissions'); // isMember, isAdmin middleware
// URL -> /recipes

router.route('/').get(list).post(isLogin,create);

router.route('/:id').get(read).put(isLogin,update).delete(isLogin,dlt);

/* ------------------------------------------------------- */
module.exports = router