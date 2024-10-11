const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv configure
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection (it should be after dotenv configuration)
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
/*
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Node server",
  });
});*/

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//Port
const PORT = process.env.PORT || 1000;
const DEV_MODE = process.env.DEV_MODE;

//listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${DEV_MODE} mode on port ${PORT}`.bgYellow.white
  );
});
