"use strict";
/* -------------------------- EXPRESS - RECIPE API -------------------------- */
/* ------------------------ Authentication Middleware ----------------------- */

const jwt = require("jsonwebtoken");
const CustomError = require("../helpers/customError");
module.exports = async (req, res, next) => {
  req.user = null;
  const auth = req?.headers?.authorization;

  const tokenArr = auth ? auth.split(" ") : null;

  if (tokenArr && tokenArr[0] === "Bearer") {
    jwt.verify(tokenArr[1], process.env.ACCESS_KEY, (error, accessData) => {
      if (error) {
        next(new CustomError("jwt error" + error.message, 401));
        req.user = accessData ? accessData : null;
      }
    });
  }
  next();
};
