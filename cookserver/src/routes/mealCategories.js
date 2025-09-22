"use strict";
/* -------------------------------------------------------
Cookkit-MealCategories-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/mealCategories');
const {isLogin,isAdmin} = require('../middlewares/permissions'); // isMember, isAdmin middleware

// URL -> /MealCategories

router.route('/').get(list).post(isAdmin,create);

router.route('/:id').get(isLogin,read).put(isAdmin,update).delete(isAdmin,dlt);

module.exports = router