"use strict";
/* -------------------------------------------------------
Cookkit-USERS-Controller
------------------------------------------------------- */

const User = require("../models/users");
const CustomError = require("../helpers/customError");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'List Users'
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

    const result = await res.getModelList(User);
    if (!result) throw new CustomError("No Users Found", 404);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      result,
    });
  },

  create: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Create User'
        */

    //? Password Validation

    const result = await User.create(req.body);
    if (!result) throw new CustomError("Unable to create record", 404);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Get Single User'
        */

    const result = await User.findById(req.params.id);
    if (!result) throw new CustomError("No users found.", 404);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Update User'
        */

    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
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
            #swagger.tags = ['Users']
            #swagger.summary = 'Delete User'
        */

    const result = await User.deleteOne({ _id: req.params.id });

    if (!result.deletedCount)
      throw new CustomError("Data is not found or already deleted.", 404);

    res.sendStatus(204);
  },
};
