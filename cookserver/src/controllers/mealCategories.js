"use strict";
/* -------------------------------------------------------
Cookkit-MealCategories-Controller
------------------------------------------------------- */

const MealCategories = require("../models/mealCategories");
const CustomError = require("../helpers/customError");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['MealCategoriess']
            #swagger.summary = 'List MealCategoriess'
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

    const result = await res.getModelList(MealCategories);
    if (!result) throw new CustomError("No MealCategoriess Found", 404);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(MealCategories),
      result,
    });
  },

  create: async (req, res) => {
    /* 
            #swagger.tags = ['MealCategoriess']
            #swagger.summary = 'Create MealCategories'
        */

    //? Password Validation

    const result = await MealCategories.create(req.body);
    if (!result) throw new CustomError("Unable to create record", 404);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
            #swagger.tags = ['MealCategoriess']
            #swagger.summary = 'Get Single MealCategories'
        */

    const result = await MealCategories.findById(req.params.id);
    if (!result) throw new CustomError("No MealCategoriess found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ['MealCategoriess']
            #swagger.summary = 'Update MealCategories'
        */

    const result = await MealCategories.findByIdAndUpdate(req.params.id, req.body, {
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
            #swagger.tags = ['MealCategoriess']
            #swagger.summary = 'Delete MealCategories'
        */

    const result = await MealCategories.deleteOne({ _id: req.params.id });

    if (!result.deletedCount)
      throw new CustomError("Data is not found or already deleted.", 404);

    res.sendStatus(204);
  },
};
