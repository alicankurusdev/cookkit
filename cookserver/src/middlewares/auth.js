"use strict";
/* -------------------------------------------------------
    EXPRESS - RECIPE API
------------------------------------------------------- */
// auth middleware

module.exports = async (req, res, next) => {
  req.user = null;

  // Session check
  const { _id, email } = req?.session || {};
  if (_id && email) {
    const user = await User.findOne({ _id, email });
    if (user) req.user = user;
  }

  // Token check (sadece req.user boşsa çalışsın)
  if (!req.user) {
    const auth = req.headers?.authorization || null;
    const tokenArr = auth ? auth.split(" ") : null;
    if (tokenArr && tokenArr[0] == "Token") {
      const tokenData = await Token.findOne({ token: tokenArr[1] }).populate(
        "userId"
      );
      if (tokenData) req.user = tokenData.userId;
    }
  }

  next();
};

// Deneme ekleme işlemi
