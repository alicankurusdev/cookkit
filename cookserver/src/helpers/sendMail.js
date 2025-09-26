"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sendMail(to, subject, message)

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

module.exports = function sendMail(to, subject, template,context) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alicankurus.dev@gmail.com",
      pass: "yame kjvr uhfq ijgf",
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.resolve("../views/email/partials/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("../views/email/"),
      extName: ".hbs",
    })
  );

  transporter.sendMail(
    {
      from: "alicankurus.dev@gmail.com",
      to,
      subject,
      template,
      context
    },
    function (error, success) {
      success ? console.log("Success:", success) : console.log("Error:", error);
    }
  );
};
