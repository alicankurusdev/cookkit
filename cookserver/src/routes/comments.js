"use strict";
/* -------------------------------------------------------
Cookkit-Comments-ROUTE
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/comments');

// URL -> /Comments

router.route('/').get(list).post(create);

router.route('/:id').get(read).put(update).delete(dlt);

/* ------------------------------------------------------- */
module.exports = router