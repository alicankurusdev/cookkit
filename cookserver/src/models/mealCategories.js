"use strict";
/* -------------------------------------------------------
    EXPRESS - RECIPE API - MEALCATEGORY MODEL
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const mealCategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    }
  },
  {
    collection: "mealCategories",
    timestamps: true,
  }
);

mealCategorySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = model('MealCategory', mealCategorySchema);