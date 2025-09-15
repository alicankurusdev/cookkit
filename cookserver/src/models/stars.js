"use strict";
/* -------------------------------------------------------
    EXPRESS - RECIPE API - STAR MODEL
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const starSchema = new Schema(
  {
    creatorUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    value: {
      type: Number,
      required: true,
    }

  },
  {
    collection: "stars",
    timestamps: true,
  }
);

starSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = model('Star', starSchema);