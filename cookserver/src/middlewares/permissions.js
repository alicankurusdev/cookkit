"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API -Permissions middleware
------------------------------------------------------- */

const CustomError = require("../helpers/customError");

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) {
      next();
    } else {
      throw new CustomError(
        "NoPermission: You must be login and active user",
        403
      );
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      throw new CustomError("NoPermission: You must be login and Admin", 403);
    }
  },
};
