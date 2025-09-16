"use strict";
/* -------------------------------------------------------
Cookkit-RECIPES-Controller
------------------------------------------------------- */

const Recipe = require("../models/recipes");
const CustomError = require("../helpers/customError");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Recipes']
            #swagger.summary = 'List Recipes'
            #swagger.desription = `
                You can sen query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const result = await res.getModelList(Recipe);
    if (!result) throw new CustomError("No Recipes Found", 404);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Recipe),
      result,
    });
  },

  create: async (req, res) => {
    /* 
            #swagger.tags = ['Recipes']
            #swagger.summary = 'Create Recipe'
        */

    //? Password Validation

    const result = await Recipe.create(req.body);
    if (!result) throw new CustomError("Unable to create record", 404);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
            #swagger.tags = ['Recipes']
            #swagger.summary = 'Get Single Recipe'
        */

    const result = await Recipe.findById(req.params.id);
    if (!result) throw new CustomError("No Recipes found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ['Recipes']
            #swagger.summary = 'Update Recipe'
        */

    const result = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) throw new CustomError("Data is not found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },

  dlt: async (req, res) => {
    /* 
            #swagger.tags = ['Recipes']
            #swagger.summary = 'Delete Recipe'
        */

    const result = await Recipe.deleteOne({ _id: req.params.id });

    if (!result.deletedCount)
      throw new CustomError("Data is not found or already deleted.", 404);

    res.sendStatus(204);
  },
};
