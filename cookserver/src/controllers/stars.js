"use strict";
/* -------------------------------------------------------
Cookkit-Stars-Controller
------------------------------------------------------- */

const Star = require("../models/stars");
const CustomError = require("../helpers/customError");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Stars']
            #swagger.summary = 'List Stars'
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

    const result = await res.getModelList(Star);
    if (!result) throw new CustomError("No Stars Found", 404);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Star),
      result,
    });
  },

  create: async (req, res) => {
    /* 
            #swagger.tags = ['Stars']
            #swagger.summary = 'Create Stars'
        */

    //? Password Validation

    const result = await Star.create(req.body);
    if (!result) throw new CustomError("Unable to create record", 404);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
            #swagger.tags = ['Stars']
            #swagger.summary = 'Get Single Star'
        */

    const result = await Star.findById(req.params.id);
    if (!result) throw new CustomError("No Stars found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ['Stars']
            #swagger.summary = 'Update Stars'
        */

    const result = await Star.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) throw new CustomError("Star data is not found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },

  dlt: async (req, res) => {
    /* 
            #swagger.tags = ['Stars']
            #swagger.summary = 'Delete Stars'
        */

    const result = await Star.deleteOne({ _id: req.params.id });

    if (!result.deletedCount)
      throw new CustomError("Data is not found or already deleted.", 404);

    res.sendStatus(204);
  },
};
