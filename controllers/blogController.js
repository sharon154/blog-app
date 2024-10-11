const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel")

//GET ALL BLOGS || GET
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});

    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found"
      });
    }
    return res.status(200).send({
      blogCount: blogs.length,
      success: true,
      message: "All Blogs",
      blogs
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Getting all Blogs",
      success: false,
      error
    });
  }
};

//GET BLOG BY ID || GET
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found with this id",
        success: false,

      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetched single block",
      blog
    });
  }
  catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in Getting This Blog",
      success: false,
      error
    });
  }
}

//CREATE BLOG || POST
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const existingUser = await userModel.findById(user);
    //validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user"
      });
    }
    const newBlog = new blogModel({ title, description, image, user });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();


    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "New Blog Created",
      newBlog
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in Creating Blog",
      success: false,
      error
    });
  }
}

//UPDATE BLOG || POST
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, user } = req.body;
    const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
    //validation
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found with this id",
        success: false,

      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      blog
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in Updating Blog",
      success: false,
      error
    });
  }
}

//DELETE BLOG || POST
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findOneAndDelete(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    //validation
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found with this id",
        success: false,

      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in Deleting Blog",
      success: false,
      error
    });
  }
}

//GET BLOG BY USER || GET
exports.getBlogByUserController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this user id",

      });
    }
    return res.status(200).send({
      userBlogCount: userBlog.blogs.length,
      success: true,
      message: "Your Blog Fetched Successfully",
      userBlog
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in Getting Your Blog",
      success: false,
      error
    });
  }
}
