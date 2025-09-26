"use strict";
/* -------------------------------------------------------
    EXPRESS - RECIPE API - USER MODEL
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const passwordEncrypt = require("../helpers/passwordEncrypt");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email is not valid.",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: passwordEncrypt,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isMember: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

module.exports = model("User", userSchema);
