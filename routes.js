const controls = require("./controllers/controls.js");

const express = require("express");
const bulkRouter = new express.Router();
const singleRouter = new express.Router();

bulkRouter
   .route("")
   .get(controls.getArticles)
    .post(controls.postArticles)
    .delete(controls.deleteArticles)

singleRouter
    .route("/:title")
    .get(controls.getSingleArticle)
    .delete(controls.deleteSingleArticle)
    .put(controls.updateSingleArticle)
    .patch(controls.patchSingleArticle)

module.exports = {
    singleRouter,
    bulkRouter
}