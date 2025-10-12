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
    isPublish:{
      type:Boolean,
      default: true,  //!default false yap
    },
    imageUrl:{              //!list olacak burasi multer sonrasi update cak
        type:String
    },
    countOfVisitors:{              
        type:Number
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }],
    mealCategories: [{
      type: Schema.Types.ObjectId,
      ref: "MealCategory",
      required: true, 
    }],
    stars: [{
      type: Schema.Types.ObjectId,         
    }],
  },
  {
    collection: "recipes",
    timestamps: true,
  }
);


module.exports = model("Recipe", recipeSchema);
