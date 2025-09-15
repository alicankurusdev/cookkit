"use strict";
/* -------------------------------------------------------
Cookkit-recipeAPP-users-controller
------------------------------------------------------- */
//* QUERY HANDLER MIDDLEWARE;

module.exports = async (req, res, next) => {

   //Filter
    const filter = req.query?.filter || {}
    //Search
    const search = req.query?.search || {}
    for (let key in search)
        search[key] = { $regex: search[key] }
     //Sort
    const sort = req.query?.sort || {}
    //LIMIT
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE) || 20
    // PAGE
    let page = Number(req.query?.page)
    page = page > 0 ? page : 1
    // SKIP
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page - 1) * limit
    // GetModelList
    res.getModelList = async (Model, customFilter = {}, populate = null) => {
        return await Model.find({ ...filter, ...search, ...customFilter }).sort(sort).skip(skip).limit(limit).populate(populate);
    };
    // Details
    res.getModelListDetails = async function (Model, customFilter = {}) {

        const data = await Model.find({ ...filter, ...search, ...customFilter });

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            totalRecords: data.length,
            pages: {
                previos: (page > 1 ? page - 1 : false),
                current: page,
                next: page + 1,
                total: Math.ceil(data.length / limit)
            }
        };

        if (details.pages.next > details.pages.total) details.pages.next = false;
        if (details.totalRecords <= limit) details.pages = false

        return details
    }


    next()
}