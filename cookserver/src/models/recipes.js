"use strict";
/* -------------------------------------------------------
    EXPRESS - RECIPE API - RECIPE MODEL
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const recipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps:{
      type: [String],
      required: true,
    },
    imageUrl:{
        type:String
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true, 
    }],
    mealCategories: [{
      type: Schema.Types.ObjectId,
      ref: "MealCategory",
      required: true, 
    }],
    stars: [{
      type: Schema.Types.ObjectId,
      ref: "Star",
      required: true, 
    }],
  },
  {
    collection: "recipes",
    timestamps: true,
  }
);

recipeSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = model("Recipe", recipeSchema);
