"use strict";

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars").default;
const path = require("path");

module.exports = function sendMail(to, subject, template, context) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alicankurus.dev@gmail.com",
      pass: "dpkc nsyk vucr zsni",
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve(__dirname,"../../views/email/partials"),
      layoutsDir: path.resolve(__dirname,"../../views/email/"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname,"../../views/email/"),
    extName: ".hbs",
  };

  // v7'de direkt hbs fonksiyonu var, bu çalışıyor
  transporter.use("compile", hbs(handlebarOptions));
  transporter.sendMail(
    {
      from: "alicankurus.dev@gmail.com",
      to,
      subject,
      template,
      context,
    },
    (error, info) => {
      if (error) console.log("Error:", error);
      else console.log("Success:", info.response);
    }
  );
};
