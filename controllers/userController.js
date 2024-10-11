const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    //Save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(200).send({
      success: true,
      message: "New User Created",
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register Callback",
      success: false,
      error
    });
  }
};

//get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    
    if (!users) {
      return res.status(200).send({
        success: false,
        message: "No Users Found"
      });
    }
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All Users",
      users
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Getting all Users",
      success: false,
      error
    });
  }
};

//login user
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    //If email or password is not filled
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password"
      });
    }
    //If email not registered
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email is not registered"
      });
    }
    //If password does not match with registered email
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password"
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Login Callback",
      success: false,
      error
    });
  }
};
