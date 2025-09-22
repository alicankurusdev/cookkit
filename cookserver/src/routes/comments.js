"use strict";
/* -------------------------------------------------------
Cookkit-Comments-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/comments');
const {isLogin} = require('../middlewares/permissions'); // isMember, isAdmin middleware


// URL -> /Comments

router.route('/').get(list).post(isLogin,create);

router.route('/:id').get(isLogin,read).put(isLogin,update).delete(isLogin,dlt);

module.exports = router