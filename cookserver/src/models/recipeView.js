"use strict";
/* -------------------------------------------------------
    EXPRESS - RECIPE API - USER MODEL
------------------------------------------------------- */

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");


const favoriteRecipeSchema = new Schema(
  {
     userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    }
  },
  {
    collection: "favoriteRecipes",
    timestamps: true,
  }
);



module.exports = model("FavoriteRecipe", favoriteRecipeSchema);
