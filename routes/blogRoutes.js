const express = require("express");
const {
  getAllBlogsController,
  getBlogByIdController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByUserController,
} = require("../controllers/blogController");

//routes object
const router = express.Router();

//GET ALL BLOGS || GET
router.get("/all-blogs", getAllBlogsController);

//GET ONE BLOG || GET
router.get("/get-blog/:id", getBlogByIdController);

//CREATE USER || POST
router.post("/create-blog", createBlogController);

//UPDATE USER || POST
router.put("/update-blog/:id", updateBlogController);

//DELETE USER || POST
router.delete("/delete-blog/:id", deleteBlogController);

//GET BLOG BY USER || GET
router.get("/user-blog/:id", getBlogByUserController);

module.exports = router;
